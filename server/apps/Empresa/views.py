from core.permissions import admin_or_superuser_or_encargado_required, admin_or_superuser_required
from django.db import transaction
from django.db.models import Q
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Dependencia, Empresa, SedeDependencia, Sede
from .serializers import DependenciaSerializer, SedeSerializer, EmpresaSerializer, SedeDependenciaSerializer

# Empresa Controller
class EmpresaController(APIView):
    def get_empresa(self):
        return Empresa.objects.first()

    @admin_or_superuser_required
    def get(self, request, *args, **kwargs):
        empresa = self.get_empresa()
        serializer = EmpresaSerializer(empresa)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @admin_or_superuser_required
    def post(self, request, *args, **kwargs):
        serializer = EmpresaSerializer(data=request.data)
        if Empresa.objects.count() == 1:
            return Response({"detail": "Ya existe un registro en la tabla Empresa. No puedes crear más registros."},
                            status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @admin_or_superuser_required
    def patch(self, request, *args, **kwargs):
        empresa = self.get_empresa()
        serializer = EmpresaSerializer(
            empresa, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @admin_or_superuser_required
    def delete(self, request, *args, **kwargs):
        empresa = self.get_empresa()
        empresa.delete() if empresa else None
        return Response(status=status.HTTP_204_NO_CONTENT)

# Sede controller
class SedeController(APIView):
    def get_sedes(self):
        queryset = Empresa.objects.first()
        return Sede.objects.filter(empresa=queryset).order_by('-created_at')


    def get_sede(self, pk):
        return Sede.objects.get(id=pk)

    @admin_or_superuser_or_encargado_required
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        search = self.kwargs.get('search')
        sedes = (
            [self.get_sede(pk)] if pk else
            self.get_sedes()
        )
        if pk:
            sede = self.get_sede(pk)
            serializer = SedeSerializer(sede)
        else:
            sedes = self.get_sedes()
            serializer = SedeSerializer(sedes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @admin_or_superuser_or_encargado_required
    def post(self, request, *args, **kwargs):
        serializer = SedeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @admin_or_superuser_or_encargado_required
    def patch(self, request, *args, **kwargs):
        sede = self.get_sede(self.kwargs.get('pk'))
        serializer = SedeSerializer(sede, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @admin_or_superuser_required
    def delete(self, request, *args, **kwargs):
        sede = self.get_sede(self.kwargs.get('pk'))
        sede.delete() if sede else None
        return Response(status=status.HTTP_204_NO_CONTENT)


class DependenciaController(APIView):
    @admin_or_superuser_required
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')

        dependencias = (
            [self.get_dependencia(pk)] if pk else
            self.get_dependencias()
        )

        serializer = DependenciaSerializer(dependencias, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @admin_or_superuser_required
    def post(self, request, *args, **kwargs):
        serializer = DependenciaSerializer(data=request.data)
        return self._handle_serializer_response(serializer, status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST)

    @admin_or_superuser_required
    def patch(self, request, *args, **kwargs):
        dependencia = self.get_dependencia(self.kwargs.get('pk'))
        serializer = DependenciaSerializer(
            dependencia, data=request.data, partial=True)
        return self._handle_serializer_response(serializer, status.HTTP_200_OK, status.HTTP_400_BAD_REQUEST)

    @admin_or_superuser_required
    def delete(self, request, *args, **kwargs):
        dependencia = self.get_dependencia(self.kwargs.get('pk'))
        dependencia.delete() if dependencia else None
        return Response(status=status.HTTP_204_NO_CONTENT)

    def _handle_serializer_response(self, serializer, success_status, error_status):
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=success_status)
        print(serializer.errors)
        return Response(serializer.errors, status=error_status)

    def get_dependencias(self):
        return Dependencia.objects.all().order_by('-created_at')

    def get_dependencia(self, pk):
        return Dependencia.objects.get(id=pk)

# Sedes por dependencias


class SedeByDependencia(APIView):
    @admin_or_superuser_required
    def get(self, request, pk, format=None):
        sedes = get_list_or_404(SedeDependencia, sede=pk)
        serializer = SedeDependenciaSerializer(sedes, many=True)
        return Response(serializer.data)

    @admin_or_superuser_required
    def post(self, request, pk, format=None):
        data_list = request.data['_value']
        try:
            with transaction.atomic():
                for data in data_list:
                    myData = {
                        'sede': data['sede_id'],
                        'dependencia': data['dependencia_id']
                    }
                    serializer = SedeDependenciaSerializer(data=myData)
                    if (serializer.is_valid()):
                        serializer.save()
                return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SedeByDependenciaDetails(APIView):
    @admin_or_superuser_required
    def delete(self, request, sede_id, dep_id, format=None):
        if queryset := SedeDependencia.objects.get(id=dep_id, sede__id=sede_id):
            queryset.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)


class obtenerDependenciasParaSede(APIView):
    @admin_or_superuser_required
    def get(self, request, sede_id, format=None):
        # Consulto las dependencias que tiene la sede
        dependencias = SedeDependencia.objects.filter(sede__id=sede_id)
        # si existe una sede añadida, procedo con filtro
        if dependencias:
            # Obtengo los id de las dependencias
            ids = dependencias.values_list('dependencia', flat=True)
            # Consulto las dependencias que no estan en la sede
            dependencias = Dependencia.objects.exclude(id__in=ids)
            print(dependencias)
        else:
            dependencias = Dependencia.objects.all()
        serializer = DependenciaSerializer(dependencias, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
