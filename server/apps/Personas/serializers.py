from rest_framework import serializers
from .models import Funcionario,Proveedores

class FuncionarioPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ('iden', 'first_name', 'last_name','status')

class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = '__all__'