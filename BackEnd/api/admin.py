from django.contrib import admin
from .models import Categoria, Usuaris, Objectes, Transaccio, Comentaris

admin.site.register(Categoria)
admin.site.register(Usuaris)
admin.site.register(Objectes)
admin.site.register(Transaccio)
admin.site.register(Comentaris)
