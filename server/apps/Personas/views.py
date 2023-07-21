from django.shortcuts import get_list_or_404,get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Funcionario,Proveedores
from .serializers import FuncionarioPreviewSerializer,FuncionarioSerializer
from core.permissions import isAdminOrSuperuser,isEncargado
from django.db import transaction
from rest_framework.decorators import permission_classes

class FuncionarioIndex(APIView):
    @permission_classes([isAdminOrSuperuser|isEncargado])
    def get(self,request,format=None):
        funcionarios = Funcionario.objects.order_by('-iden')[:5]
        serializer = FuncionarioPreviewSerializer(funcionarios,many=True)
        return Response(serializer.data)
    
    @permission_classes([isAdminOrSuperuser|isEncargado])
    def post(self,request,format=None):
        serializer = FuncionarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
