import datetime

import jwt
from django.conf import settings
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from .models import Categoria, Usuaris, Objectes, Transaccio, Comentaris, TokenJWT
from .permissions import RolPermission
from .serializers import (
    CategoriaSerializer, UsuarisSerializer, ObjectesSerializer,
    TransaccioSerializer, ComentarisSerializer, LoginSerializer, RegisterSerializer
)


@api_view(['POST'])
def register_api(request):
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
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [RolPermission]


class UsuarisViewSet(viewsets.ModelViewSet):
    queryset = Usuaris.objects.all()
    serializer_class = UsuarisSerializer
    http_method_names = ['get', 'put', 'patch', 'delete', 'head', 'options']
    permission_classes = [RolPermission]

class ObjectesViewSet(viewsets.ModelViewSet):
    queryset = Objectes.objects.all()
    serializer_class = ObjectesSerializer
    permission_classes = [RolPermission]

    def get_queryset(self):
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
        """Returns objects grouped by category id"""
        categoria_id = request.query_params.get('categoria_id')
        if not categoria_id:
            return Response({'error': 'categoria_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        objectes = Objectes.objects.filter(categoria__id=categoria_id)
        serializer = self.get_serializer(objectes, many=True)
        return Response(serializer.data)


class TransaccioViewSet(viewsets.ModelViewSet):
    queryset = Transaccio.objects.all()
    serializer_class = TransaccioSerializer
    permission_classes = [RolPermission]

    def get_queryset(self):
        queryset = Transaccio.objects.all()
        donador = self.request.query_params.get('donador')
        receptor = self.request.query_params.get('receptor')

        if donador:
            queryset = queryset.filter(donador__id=donador)
        if receptor:
            queryset = queryset.filter(receptor__id=receptor)

        return queryset


class ComentarisViewSet(viewsets.ModelViewSet):
    queryset = Comentaris.objects.all()
    serializer_class = ComentarisSerializer
    permission_classes = [RolPermission]

    def get_queryset(self):
        queryset = Comentaris.objects.all()
        objecte = self.request.query_params.get('objecte')
        user = self.request.query_params.get('user')

        if objecte:
            queryset = queryset.filter(objecte__id=objecte)
        if user:
            queryset = queryset.filter(user__id=user)

        return queryset


def _generar_token(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


def _autenticar(email, password):
    try:
        user = Usuaris.objects.get(email=email)
    except Usuaris.DoesNotExist:
        return None

    if check_password(password, user.contrasenya):
        return user

    return None

@api_view(['GET'])
def me_api(request):
    token = request.headers.get('Authorization')
    if not token:
        raise AuthenticationFailed('Token no proporcionado')
    try:
        token = token.split(" ")[1]
    except:
        raise AuthenticationFailed('Formato de token inválido')
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Token expirado')
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Token inválido')
    user_id = payload['user_id']
    try:
        user = Usuaris.objects.get(id=user_id)
    except Usuaris.DoesNotExist:
        raise AuthenticationFailed('Usuario no encontrado')
    serializer = UsuarisSerializer(user)
    return Response(serializer.data)