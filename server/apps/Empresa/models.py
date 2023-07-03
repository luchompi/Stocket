from django.db import models

class Empresa(models.Model):
    NIT = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    description = models.TextField(null=True, blank=True)
    web = models.CharField(max_length=50,null=True, blank=True)

    def __str__(self):
        return f'{self.NIT} {self.name}'

class Sede(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    description = models.TextField(null=True, blank=True)
    web = models.CharField(max_length=50)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Dependencia(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class SedeDependencia(models.Model):
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE)
    dependencia = models.ForeignKey(Dependencia, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.sede} {self.dependencia}'
