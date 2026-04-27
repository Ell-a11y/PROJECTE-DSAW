from django.conf import settings
from django.db import models

# Create your models here.
class Categoria(models.Model):
    categoria = models.CharField(max_length=50)

class Usuaris(models.Model):
    auth_user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    nom = models.CharField(max_length=50)
    cognom = models.CharField(max_length=75)
    telefon = models.IntegerField()
    email = models.EmailField(unique=True)
    contrasenya = models.CharField(max_length=255)

class Objectes(models.Model):
    users = models.ForeignKey(Usuaris, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    nom = models.CharField(max_length=70)
    imatge = models.CharField(max_length=75)
    descipcio = models.CharField(max_length=150)
    qualitat = models.IntegerField()
    tipus_qualitat = [('bé', 'bé'), ('normal', 'normal'), ('malament', 'malament')]
    qualitat = models.CharField(
        max_length=15,
        choices= tipus_qualitat,
        default='normal'
    )
    tipus_estat = [('per_prestat','per_prestat'), ('donatiu', 'donatiu'), ('ja_prestat', 'ja_prestat'), ('ja_donat', 'ja_donat')]
    estat = models.CharField(
        max_length=15,
        choices= tipus_estat,
        default='per_prestat'
    )
    districte = models.CharField(max_length=50)

class Transaccio(models.Model):
    donador = models.ForeignKey(Usuaris, on_delete=models.CASCADE, related_name='transaccions_donades')
    receptor = models.ForeignKey(Usuaris, on_delete=models.CASCADE, related_name='transaccions_rebudes')
    objecte = models.ForeignKey(Objectes, on_delete=models.CASCADE)
    tipus_temporal = [('True', 'True'), ('False', 'False')]
    temporal = models.BooleanField(choices=tipus_temporal, default=False)
    data_ini = models.DateField(null=True, blank=True)
    data_fi = models.DateField(null=True, blank=True)

class Comentaris(models.Model):
    user = models.ForeignKey(Usuaris, on_delete=models.CASCADE)
    objecte = models.ForeignKey(Objectes, on_delete=models.CASCADE)
    comentari = models.CharField(max_length=150)
    data = models.DateTimeField(auto_now_add=True)


class TokenJWT(models.Model):
    user = models.ForeignKey(Usuaris, on_delete=models.CASCADE)
    token = models.TextField()
    creat_el = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token de {self.user.email}"