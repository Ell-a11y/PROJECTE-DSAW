import datetime

import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from .models import Categoria, Usuaris, Objectes, Transaccio, Comentaris, TokenJWT
from .serializers import (
    CategoriaSerializer, UsuarisSerializer, ObjectesSerializer,
    TransaccioSerializer, ComentarisSerializer, LoginSerializer, RegisterSerializer
)


@api_view(['POST'])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user, perfil = serializer.save()
        return Response(
            {
                'id': user.id,
                'perfil_id': perfil.id,
                'email': user.email,
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
        user_login = User.objects.filter(email=email).first()
        user = None
        if user_login:
            user = authenticate(username=user_login.username, password=password)
        if user:
            token = _generar_token(user)
            TokenJWT.objects.create(user=user, token=token)
            return Response({'token': token, 'email': user.email})
        return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenProtectedModelViewSet(viewsets.ModelViewSet):
    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        self.auth_user, self.auth_perfil = _obtener_user_desde_token(request)


class CategoriaViewSet(TokenProtectedModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class UsuarisViewSet(TokenProtectedModelViewSet):
    queryset = Usuaris.objects.all()
    serializer_class = UsuarisSerializer
    http_method_names = ['get', 'put', 'patch', 'delete', 'head', 'options']


class ObjectesViewSet(TokenProtectedModelViewSet):
    queryset = Objectes.objects.all()
    serializer_class = ObjectesSerializer

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


class TransaccioViewSet(TokenProtectedModelViewSet):
    queryset = Transaccio.objects.all()
    serializer_class = TransaccioSerializer

    def get_queryset(self):
        queryset = Transaccio.objects.all()
        donador = self.request.query_params.get('donador')
        receptor = self.request.query_params.get('receptor')

        if donador:
            queryset = queryset.filter(donador__id=donador)
        if receptor:
            queryset = queryset.filter(receptor__id=receptor)

        return queryset


class ComentarisViewSet(TokenProtectedModelViewSet):
    queryset = Comentaris.objects.all()
    serializer_class = ComentarisSerializer

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
        'username': user.username,
        'email': user.email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


def _obtener_user_desde_token(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    if not auth_header.startswith('Bearer '):
        raise AuthenticationFailed('Token requerido')

    token = auth_header.split(' ', 1)[1].strip()
    if not token:
        raise AuthenticationFailed('Token requerido')

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Token caducado')
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Token invalido')

    token_guardado = TokenJWT.objects.select_related('user').filter(token=token).first()
    if not token_guardado:
        raise AuthenticationFailed('Token invalido')

    if token_guardado.user.username != payload.get('username'):
        raise AuthenticationFailed('Token invalido')

    perfil = Usuaris.objects.filter(auth_user=token_guardado.user).first()
    return token_guardado.user, perfil
