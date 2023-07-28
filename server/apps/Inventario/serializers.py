from rest_framework import serializers
from .models import Marca, Categoria, Referencia, Elemento

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'