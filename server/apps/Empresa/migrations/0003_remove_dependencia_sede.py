# Generated by Django 4.2.2 on 2023-07-03 23:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Empresa', '0002_alter_empresa_web'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dependencia',
            name='sede',
        ),
    ]
