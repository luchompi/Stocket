from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Empresa
from .serializers import EmpresaSerializer
from django.shortcuts import get_object_or_404,get_list_or_404
from core.permissions import isAdminOrSuperuser,isEncargado
from rest_framework.decorators import permission_classes

@permission_classes([isAdminOrSuperuser | isEncargado])
class EmpresaIndex(APIView):
    def get(self, request, format=None):
        empresas = Empresa.objects.all()
        serializer = EmpresaSerializer(empresas, many=True)
        return Response(serializer.data)
    
    @permission_classes([isAdminOrSuperuser])
    def post(self,request, format=None):
        serializer = EmpresaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class EmpresaDetails(APIView):
    permission_classes =[isAdminOrSuperuser]
    def put(self,request, pk, format=None):
        empresa = get_object_or_404(Empresa,NIT=pk)
        serializer = EmpresaSerializer(empresa,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)