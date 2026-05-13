from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Categoria, Usuaris, Objectes, Transaccio, Comentaris


class CategoriaSerializer(serializers.ModelSerializer):
    """Serializa categorías para lectura/escritura en la API REST."""

    class Meta:
        model = Categoria
        fields = '__all__'


class UsuarisSerializer(serializers.ModelSerializer):
    """Serializa usuarios; la contraseña solo se acepta al escribir, no se expone al leer."""

    class Meta:
        model = Usuaris
        fields = '__all__'
        extra_kwargs = {
            'auth_user': {'read_only': True},
            'contrasenya': {'write_only': True},
        }


class ObjectesSerializer(serializers.ModelSerializer):
    """Serializa objetos e incluye nombres de usuario y categoría de solo lectura."""

    user_nom = serializers.CharField(source='users.nom', read_only=True)
    categoria_nom = serializers.CharField(source='categoria.categoria', read_only=True)

    class Meta:
        model = Objectes
        fields = '__all__'


class TransaccioSerializer(serializers.ModelSerializer):
    """Serializa transacciones con nombres de donador, receptor y objeto en solo lectura."""

    donador_nom = serializers.CharField(source='donador.nom', read_only=True)
    receptor_nom = serializers.CharField(source='receptor.nom', read_only=True)
    objecte_nom = serializers.CharField(source='objecte.nom', read_only=True)

    class Meta:
        model = Transaccio
        fields = '__all__'


class ComentarisSerializer(serializers.ModelSerializer):
    """Serializa comentarios con nombre de autor y de objeto en solo lectura."""

    user_nom = serializers.CharField(source='user.nom', read_only=True)
    objecte_nom = serializers.CharField(source='objecte.nom', read_only=True)

    class Meta:
        model = Comentaris
        fields = '__all__'


class LoginSerializer(serializers.Serializer):
    """Valida el cuerpo del POST de login (email y contraseña)."""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class RegisterSerializer(serializers.Serializer):
    """Valida datos de registro y crea el usuario con contraseña hasheada."""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    nom = serializers.CharField(required=True)
    cognom = serializers.CharField(required=True)
    telefon = serializers.IntegerField(required=True)

    def validate_email(self, value):
        """Impide registrar un email que ya existe en la base de datos."""
        if Usuaris.objects.filter(email=value).exists():
            raise serializers.ValidationError('Este email ya existe')
        return value

    def create(self, validated_data):
        """Persiste el nuevo perfil con contraseña cifrada mediante Django."""
        perfil = Usuaris.objects.create(
            nom=validated_data['nom'],
            cognom=validated_data['cognom'],
            telefon=validated_data['telefon'],
            email=validated_data['email'],
            contrasenya=make_password(validated_data['password']),
        )
        return perfil
