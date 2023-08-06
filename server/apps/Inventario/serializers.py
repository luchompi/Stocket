from rest_framework import serializers
from .models import Marca, Categoria, Referencia, Elemento

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ReferenciaSerializer(serializers.ModelSerializer):
    marca = serializers.SerializerMethodField('get_marcas')
    class Meta:
        model = Referencia
        fields = '__all__'

    def get_marcas(self,obj):
        return obj.marca.name

class ReferenciaStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referencia
        fields = '__all__'
