from django.apps import AppConfig


class ApiConfig(AppConfig):
    """Configuración de la app Django `api` (modelo de clave primaria por defecto)."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
