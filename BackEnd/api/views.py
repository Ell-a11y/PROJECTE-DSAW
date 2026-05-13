import datetime

import jwt
from django.conf import settings
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from .models import Categoria, Usuaris, Objectes, Transaccio, Comentaris, TokenJWT
from .jwt_token import extract_bearer_token_or_raise, validate_stored_jwt_token_or_raise
from .permissions import RolPermission
from .serializers import (
    CategoriaSerializer, UsuarisSerializer, ObjectesSerializer,
    TransaccioSerializer, ComentarisSerializer, LoginSerializer, RegisterSerializer
)


@api_view(['POST'])
def register_api(request):
    """Crea un usuario nuevo y devuelve id y email si los datos son válidos."""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        perfil = serializer.save()
        return Response(
            {
                'perfil_id': perfil.id,
                'email': perfil.email,
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_api(request):
    """Valida email/contraseña, guarda un JWT en sesión (tabla TokenJWT) y lo devuelve."""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = _autenticar(email, password)
        if user:
            token = _generar_token(user)
            TokenJWT.objects.create(user=user, token=token)
            return Response({'token': token, 'email': user.email})
        return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoriaViewSet(viewsets.ModelViewSet):
    """CRUD de categorías (listar, crear, editar, borrar) con control por rol/token."""
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [RolPermission]


class UsuarisViewSet(viewsets.ModelViewSet):
    """Gestión de perfiles de usuario (sin POST vía router; registro vía register_api)."""
    queryset = Usuaris.objects.all()
    serializer_class = UsuarisSerializer
    http_method_names = ['get', 'put', 'patch', 'delete', 'head', 'options']
    permission_classes = [RolPermission]

class ObjectesViewSet(viewsets.ModelViewSet):
    """CRUD de objetos con filtros opcionales por query string."""
    queryset = Objectes.objects.all()
    serializer_class = ObjectesSerializer
    permission_classes = [RolPermission]

    def get_queryset(self):
        """Filtra objetos por categoria, estat, user y/o districte si vienen en la URL."""
        queryset = Objectes.objects.all()
        categoria = self.request.query_params.get('categoria')
        estat = self.request.query_params.get('estat')
        user = self.request.query_params.get('user')
        districte = self.request.query_params.get('districte')

        if categoria:
            queryset = queryset.filter(categoria__id=categoria)
        if estat:
            queryset = queryset.filter(estat=estat)
        if user:
            queryset = queryset.filter(users__id=user)
        if districte:
            queryset = queryset.filter(districte__icontains=districte)

        return queryset

    @action(detail=False, methods=['get'])
    def per_categoria(self, request):
        """Lista objetos de una categoría; exige el parámetro categoria_id."""
        categoria_id = request.query_params.get('categoria_id')
        if not categoria_id:
            return Response({'error': 'categoria_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        objectes = Objectes.objects.filter(categoria__id=categoria_id)
        serializer = self.get_serializer(objectes, many=True)
        return Response(serializer.data)


class TransaccioViewSet(viewsets.ModelViewSet):
    """CRUD de transacciones (préstamos/donaciones) entre usuarios."""
    queryset = Transaccio.objects.all()
    serializer_class = TransaccioSerializer
    permission_classes = [RolPermission]

    def get_queryset(self):
        """Filtra por donador y/o receptor si se pasan sus ids en la query."""
        queryset = Transaccio.objects.all()
        donador = self.request.query_params.get('donador')
        receptor = self.request.query_params.get('receptor')

        if donador:
            queryset = queryset.filter(donador__id=donador)
        if receptor:
            queryset = queryset.filter(receptor__id=receptor)

        return queryset


class ComentarisViewSet(viewsets.ModelViewSet):
    """CRUD de comentarios asociados a objetos."""
    queryset = Comentaris.objects.all()
    serializer_class = ComentarisSerializer
    permission_classes = [RolPermission]

    def get_queryset(self):
        """Filtra comentarios por objecte y/o user si se indican en la URL."""
        queryset = Comentaris.objects.all()
        objecte = self.request.query_params.get('objecte')
        user = self.request.query_params.get('user')

        if objecte:
            queryset = queryset.filter(objecte__id=objecte)
        if user:
            queryset = queryset.filter(user__id=user)

        return queryset


def _generar_token(user):
    """Construye un JWT HS256 con id, email y expiración (1 hora)."""
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


def _autenticar(email, password):
    """Busca el usuario por email y comprueba la contraseña hasheada; devuelve None si falla."""
    try:
        user = Usuaris.objects.get(email=email)
    except Usuaris.DoesNotExist:
        return None

    if check_password(password, user.contrasenya):
        return user

    return None

@api_view(['GET'])
def me_api(request):
    """Devuelve el perfil del usuario cuyo Bearer token es válido y está almacenado en BD."""
    token = extract_bearer_token_or_raise(request)
    payload = validate_stored_jwt_token_or_raise(token)
    user_id = payload['user_id']
    try:
        user = Usuaris.objects.get(id=user_id)
    except Usuaris.DoesNotExist:
        raise AuthenticationFailed('Usuario no encontrado')
    serializer = UsuarisSerializer(user)
    return Response(serializer.data)