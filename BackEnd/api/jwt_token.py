import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

from .models import TokenJWT


def extract_bearer_token(request):
    auth_header = request.META.get("HTTP_AUTHORIZATION", "") or request.headers.get(
        "Authorization", ""
    )
    if not auth_header.startswith("Bearer "):
        return None
    token = auth_header.split(" ", 1)[1].strip()
    return token or None


def extract_bearer_token_or_raise(request):
    """Authorization: Bearer <jwt> con mensajes claros para /api/me/ y similares."""
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
    """
    Token must exist in DB (sesión/revocación) y el JWT debe ser válido
    (firma + exp, etc.).
    """
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
    """
    Igual que validate_stored_jwt_token pero con errores HTTP para /api/me/.
    Devuelve el payload del JWT si es válido.
    """
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
