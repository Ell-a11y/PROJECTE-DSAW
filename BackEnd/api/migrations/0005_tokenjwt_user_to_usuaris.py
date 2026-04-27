import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_usuaris_contrasenya'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tokenjwt',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuaris'),
        ),
    ]
