from rest_framework import permissions

from .jwt_token import extract_bearer_token, validate_stored_jwt_token


class RolPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            return True

        token = extract_bearer_token(request)
        if token and validate_stored_jwt_token(token):
            return True

        if request.method in permissions.SAFE_METHODS:
            view_name = getattr(view, "basename", "")
            return view_name in {"objectes", "comentaris", "categoria"}

        return False
