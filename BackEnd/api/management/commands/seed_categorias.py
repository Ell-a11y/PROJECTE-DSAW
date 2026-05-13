from django.core.management.base import BaseCommand
from api.models import Categoria

DEFAULT_CATEGORIAS = [
    "Mobiliari",
    "Roba i complements",
    "Llibres i multimèdia",
    "Electrònica",
    "Esports i oci",
    "Joguines",
    "Eines i bricolatge",
    "Altres",
]


class Command(BaseCommand):
    help = "Crea categories per defecte si encara no n'hi ha amb aquest nom."

    def add_arguments(self, parser):
        """Añade la opción --quiet para reducir la salida por consola."""
        parser.add_argument(
            "--quiet",
            action="store_true",
            help="Només imprimeix el resum final.",
        )

    def handle(self, *args, **options):
        """Inserta categorías por defecte con get_or_create e informa cuántas eran nuevas."""
        quiet = options["quiet"]
        created_count = 0
        existed_count = 0

        for nombre in DEFAULT_CATEGORIAS:
            _obj, created = Categoria.objects.get_or_create(categoria=nombre)
            if created:
                created_count += 1
                if not quiet:
                    self.stdout.write(self.style.SUCCESS(f"Creat: {nombre}"))
            else:
                existed_count += 1
                if not quiet:
                    self.stdout.write(f"Ja existia: {nombre}")

        self.stdout.write(
            self.style.SUCCESS(
                f"Categories: {created_count} noves, {existed_count} ja existien."
            )
        )
