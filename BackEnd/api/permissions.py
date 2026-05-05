from rest_framework import permissions
from .models import TokenJWT

class RolPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            return True

        if self._has_valid_token(request):
            return True

        if request.method in permissions.SAFE_METHODS:
            view_name = getattr(view, "basename", "")
            return view_name in {"objectes", "comentaris", "categoria"}

        return False

    def _has_valid_token(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION", "")
        if not auth_header.startswith("Bearer "):
            return False

        token = auth_header.split(" ", 1)[1].strip()
        if not token:
            return False

        return TokenJWT.objects.filter(token=token).exists()