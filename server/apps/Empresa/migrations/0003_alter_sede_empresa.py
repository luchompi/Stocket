# Generated by Django 4.2.2 on 2023-07-14 03:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Empresa', '0002_alter_empresa_nit_alter_sede_web'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sede',
            name='empresa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Empresa.empresa', to_field='NIT'),
        ),
    ]