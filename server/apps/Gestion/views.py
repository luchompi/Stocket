from core.permissions import isAdminOrSuperuser, isEncargado
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.Inventario.models import Elemento
from apps.Inventario.serializers import ElementoViewSerializer
from .models import Asignacion, DetallesAsignacion
from .serializers import AsignacionSerializer, DetallesAsignacionSerializer
from django.db.models import Q
from django.db import transaction

from ..Personas.models import Funcionario

"""
    Esta clase se encarga de listar y guardar asignaciones
"""
class AsignacionIndex(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]
    def get(self, request):
        asignacion = Asignacion.objects.order_by('-timestamps')[:5]
        serializer = AsignacionSerializer(asignacion, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        funcionario = request.data['funcionario']
        elementos = request.data['elementos']
        asignacion = Asignacion.objects.create(funcionario_id=funcionario['iden'], user=request.user)
        with transaction.atomic():
            try:
                for elemento in elementos:
                    elemento_obj = Elemento.objects.get(placa=elemento['placa'])
                    DetallesAsignacion.objects.create(asignacion=asignacion, elemento=elemento_obj)
                    elemento_obj.estado = 'Asignado'
                    elemento_obj.save()
            except Exception as e:
                transaction.rollback()
                return Response({'message': e}, status=status.HTTP_400_BAD_REQUEST)
        serializer = AsignacionSerializer(asignacion)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

class AsignacionDetail(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]
    def get(self, request, pk, format=None):
        asignacion = Asignacion.objects.get(pk=pk)
        serializer = AsignacionSerializer(asignacion)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        funcionario = request.data['_value']['funcionario']
        asignacion = Asignacion.objects.get(id=pk)
        func=Funcionario.objects.get(iden=funcionario)
        asignacion.funcionario = func
        asignacion.save()
        return Response(status=status.HTTP_200_OK)

    def delete(self,request,pk,format=None):
        asignacion = Asignacion.objects.get(pk=pk)
        queryset = DetallesAsignacion.objects.filter(asignacion_id=pk)
        with transaction.atomic():
            for element in queryset:
                element.elemento.estado = 'Por asignar'
                element.elemento.save()
            queryset.delete()
            asignacion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class AsignacionSearch(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]
    def get(self, request, pk):
        asignacion = Asignacion.objects.filter(Q(funcionario__iden=pk) | Q(funcionario__first_name__icontains=pk))
        serializer = AsignacionSerializer(asignacion, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DetallesAsignacionDetail(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]
    def get(self, request, pk, format=None):
        queryset = DetallesAsignacion.objects.filter(asignacion_id=pk)
        serializer = DetallesAsignacionSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class DetalleAsignacionSearch(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]
    def get(self, request, format=None):
        queryset = Elemento.objects.filter(estado='Por asignar')[:5]
        serializer = ElementoViewSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

""""
    Busqueda de elementos por argumentos, esta busqueda solo aplica para la consulta
    de elementos cuando se va a realizar una asignacion, ya sea por marca, por referencia,
    por modelo o por placa"""
class SearchElementByArgs(APIView):
    def post(self,request,format=None):
        query = Q(estado='Por asignar')
        if request.data['param'] == 'marca':
            query &= Q(referencia__marca__name__icontains=request.data['value'])
        elif request.data['param'] == 'categoria':
            query &= Q(referencia__categoria__name__icontains=request.data['value'])
        elif request.data['param'] == 'modelo':
            query &= Q(modelo__icontains=request.data['value'])
        elif request.data['param'] == 'placa':
            query &= Q(placa__icontains=request.data['value'])
        queryset = Elemento.objects.filter(query)[:5]
        serializer = ElementoViewSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)