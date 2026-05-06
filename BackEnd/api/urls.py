from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoriaViewSet)
router.register(r'usuaris', views.UsuarisViewSet)
router.register(r'objectes', views.ObjectesViewSet)
router.register(r'transaccions', views.TransaccioViewSet)
router.register(r'comentaris', views.ComentarisViewSet)

urlpatterns = [
    path('api/register/', views.register_api, name='register_api'),
    path('api/login/', views.login_api, name='login_api'),
    path('api/me/', views.me_api, name='me_api'),
    path('', include(router.urls)),
]
