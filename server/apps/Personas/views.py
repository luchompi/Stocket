from django.shortcuts import get_list_or_404,get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.Empresa.models import Sede
from .models import Funcionario,Proveedores
from .serializers import FuncionarioPreviewSerializer,FuncionarioSerializer,FuncionarioStoreSerializer
from core.permissions import isAdminOrSuperuser,isEncargado
from django.db import transaction
from django.db.models import Q
from rest_framework.decorators import permission_classes

class FuncionarioIndex(APIView):
    @permission_classes([isAdminOrSuperuser|isEncargado])
    def get(self,request,format=None):
        funcionarios = Funcionario.objects.order_by('-iden')[:5]
        serializer = FuncionarioPreviewSerializer(funcionarios,many=True)
        return Response(serializer.data)
    
    @permission_classes([isAdminOrSuperuser|isEncargado])
    def post(self,request,format=None):
        myData = request.data.copy()
        queryset = Sede.objects.get(Q(name__exact=request.data.get('sede'))|Q(id__exact=request.data.get('sede')))
        myData['sede'] = queryset.id
        serializer = FuncionarioStoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class FuncionarioDetail(APIView):
    @permission_classes([isAdminOrSuperuser|isEncargado])
    def get(self,request,pk,format=None):
        funcionario = get_object_or_404(Funcionario,iden=pk)
        serializer = FuncionarioSerializer(funcionario)
        return Response(serializer.data)
    
    @permission_classes([isAdminOrSuperuser|isEncargado])
    def put(self,request,pk,format=None):
        funcionario = get_object_or_404(Funcionario,iden=pk)
        myData = request.data.copy()
        queryset = Sede.objects.get(name__exact=request.data.get('sede'))
        myData['sede'] = queryset.id
        serializer = FuncionarioSerializer(funcionario,data=myData,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([isAdminOrSuperuser|isEncargado])
    def delete(self,request,pk,format=None):
        queryset = get_object_or_404(Funcionario,iden=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)