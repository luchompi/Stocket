from core.permissions import isAdminOrSuperuser, isEncargado
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Empresa, Sede
from .serializers import EmpresaSerializer, SedeSerializer


# Empresa Controllers
class EmpresaIndex(APIView):
    @permission_classes([isAdminOrSuperuser | isEncargado])
    def get(self, request, format=None):
        empresas = Empresa.objects.all()
        serializer = EmpresaSerializer(empresas, many=True)
        return Response(serializer.data)

    @permission_classes([isAdminOrSuperuser])
    def post(self, request, format=None):
        serializer = EmpresaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmpresaDetails(APIView):
    permission_classes = [isAdminOrSuperuser]

    def put(self, request, pk, format=None):
        empresa = get_object_or_404(Empresa, id=pk)
        serializer = EmpresaSerializer(empresa, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Sede Controllers
class SedeIndex(APIView):
    @permission_classes([isAdminOrSuperuser | isEncargado])
    def get(self, request, NIT, format=None):
        sedes = get_list_or_404(Sede, empresa__NIT=NIT)
        serializer = SedeSerializer(sedes, many=True)
        return Response(serializer.data)

    @permission_classes([isAdminOrSuperuser])
    def post(self, request, NIT, format=None):
        myData = request.data.copy()
        empresa = Empresa.objects.get(NIT=NIT)
        myData['empresa'] = empresa.NIT
        serializer = SedeSerializer(data=myData)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SedeDetails(APIView):
    permission_classes = [isAdminOrSuperuser]

    def get(self, request, NIT, pk, format=None):
        sede = get_object_or_404(Sede, id=pk, empresa=NIT)
        serializer = SedeSerializer(sede)
        return Response(serializer.data)

    def put(self, request, pk,NIT, format=None):
        sede = get_object_or_404(Sede, id=pk, empresa__NIT=NIT)
        serializer = SedeSerializer(sede, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk,NIT, format=None):
        try:
            sede = get_object_or_404(Sede, id=pk,empresa__NIT=NIT)
            sede.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except (sede.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
