from core.permissions import isAdminOrSuperuser, isEncargado
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Marca, Categoria, Referencia, Elemento
from .serializers import MarcaSerializer
from django.db import transaction
from django.db.models import Q

class MarcaSearch(APIView):
    @permission_classes([isAdminOrSuperuser | isEncargado])
    def get(self,request,pk,format=None):
        queryset = Marca.objects.filter(name__icontains=pk)
        serializer = MarcaSerializer(queryset,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class MarcaIndex(APIView):
    @permission_classes([isAdminOrSuperuser | isEncargado])
    def get(self,request,format=None):
        queryset = Marca.objects.order_by('-created_at')[:5]
        serializer = MarcaSerializer(queryset,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    @permission_classes([isAdminOrSuperuser | isEncargado])
    def post(self,request,format=None):
        serializer = MarcaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class MarcaDetail(APIView):
    @permission_classes([isAdminOrSuperuser | isEncargado])
    def get(self,request,id,format=None):
        queryset = get_object_or_404(Marca,pk=id)
        serializer = MarcaSerializer(queryset)
        return Response(serializer.data,status=status.HTTP_200_OK)

    @permission_classes([isAdminOrSuperuser | isEncargado])
    def put(self,request,id,format=None):
        marca = get_object_or_404(Marca,pk=id)
        serializer = MarcaSerializer(marca,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    @permission_classes([isAdminOrSuperuser | isEncargado])
    def delete(self,request,id,format=None):
        marca = get_object_or_404(Marca,pk=id)
        marca.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)