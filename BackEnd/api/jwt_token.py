import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

from .models import TokenJWT


def extract_bearer_token(request):
    """Obtiene el JWT del header Authorization Bearer sin lanzar error si falta o el formato es incorrecto."""
    auth_header = request.META.get("HTTP_AUTHORIZATION", "") or request.headers.get(
        "Authorization", ""
    )
    if not auth_header.startswith("Bearer "):
        return None
    token = auth_header.split(" ", 1)[1].strip()
    return token or None


def extract_bearer_token_or_raise(request):
    """Igual que extract_bearer_token pero lanza AuthenticationFailed si falta o el formato no es Bearer."""
    auth_header = request.META.get("HTTP_AUTHORIZATION", "") or request.headers.get(
        "Authorization", ""
    )
    if not auth_header:
        raise AuthenticationFailed("Token no proporcionado")
    if not auth_header.startswith("Bearer "):
        raise AuthenticationFailed("Formato de token inválido")
    try:
        token = auth_header.split(" ", 1)[1].strip()
    except Exception:
        raise AuthenticationFailed("Formato de token inválido")
    if not token:
        raise AuthenticationFailed("Token no proporcionado")
    return token


def validate_stored_jwt_token(token_string):
    """Comprueba que el token exista en BD y que el JWT decodifique bien (firma y caducidad)."""
    if not token_string:
        return False
    if not TokenJWT.objects.filter(token=token_string).exists():
        return False
    try:
        jwt.decode(token_string, settings.SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False
    return True


def validate_stored_jwt_token_or_raise(token_string):
    """Valida el token como validate_stored_jwt_token y devuelve el payload o lanza AuthenticationFailed."""
    if not token_string:
        raise AuthenticationFailed("Token no proporcionado")
    if not TokenJWT.objects.filter(token=token_string).exists():
        raise AuthenticationFailed("Token inválido")
    try:
        return jwt.decode(token_string, settings.SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Token expirado")
    except jwt.InvalidTokenError:
        raise AuthenticationFailed("Token inválido")
