from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Categoria, Usuaris, Objectes, Transaccio, Comentaris


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class UsuarisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuaris
        fields = '__all__'
        extra_kwargs = {
            'auth_user': {'read_only': True},
            'contrasenya': {'write_only': True},
        }


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


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    nom = serializers.CharField(required=True)
    cognom = serializers.CharField(required=True)
    telefon = serializers.IntegerField(required=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists() or Usuaris.objects.filter(email=value).exists():
            raise serializers.ValidationError('Este email ya existe')
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        perfil = Usuaris.objects.create(
            auth_user=user,
            nom=validated_data['nom'],
            cognom=validated_data['cognom'],
            telefon=validated_data['telefon'],
            email=validated_data['email'],
            contrasenya='',
        )
        return user, perfil
