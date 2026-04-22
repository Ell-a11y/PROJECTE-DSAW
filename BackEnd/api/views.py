from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Categoria, Usuaris, Objectes, Transaccio, Comentaris
from .serializers import (
    CategoriaSerializer, UsuarisSerializer, ObjectesSerializer,
    TransaccioSerializer, ComentarisSerializer
)


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class UsuarisViewSet(viewsets.ModelViewSet):
    queryset = Usuaris.objects.all()
    serializer_class = UsuarisSerializer


class ObjectesViewSet(viewsets.ModelViewSet):
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


class TransaccioViewSet(viewsets.ModelViewSet):
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


class ComentarisViewSet(viewsets.ModelViewSet):
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
