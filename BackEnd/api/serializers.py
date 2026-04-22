from rest_framework import serializers
from .models import Categoria, Usuaris, Objectes, Transaccio, Comentaris


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class UsuarisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuaris
        fields = '__all__'
        extra_kwargs = {'contrasenya': {'write_only': True}}


class ObjectesSerializer(serializers.ModelSerializer):
    # Read-only nested info
    user_nom = serializers.CharField(source='users.nom', read_only=True)
    categoria_nom = serializers.CharField(source='categoria.categoria', read_only=True)

    class Meta:
        model = Objectes
        fields = '__all__'


class TransaccioSerializer(serializers.ModelSerializer):
    donador_nom = serializers.CharField(source='donador.nom', read_only=True)
    receptor_nom = serializers.CharField(source='receptor.nom', read_only=True)
    objecte_nom = serializers.CharField(source='objecte.nom', read_only=True)

    class Meta:
        model = Transaccio
        fields = '__all__'


class ComentarisSerializer(serializers.ModelSerializer):
    user_nom = serializers.CharField(source='user.nom', read_only=True)
    objecte_nom = serializers.CharField(source='objecte.nom', read_only=True)

    class Meta:
        model = Comentaris
        fields = '__all__'
