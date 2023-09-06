from datetime import datetime as dt
from datetime import timedelta as td

from apps.Inventario.models import Elemento
from apps.Inventario.serializers import ElementoViewSerializer
from core.permissions import isAdminOrSuperuser, isEncargado
from django.db import transaction
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Asignacion, DetallesAsignacion, Mantenimiento, Baja, DetalleBaja
from .serializers import AsignacionSerializer, DetallesAsignacionSerializer, MantenimientoSerializer, BajaSerializer, \
    DetalleBajaSerializer
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
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AsignacionDetail(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]

    def get(self, request, pk, format=None):
        asignacion = Asignacion.objects.get(pk=pk)
        serializer = AsignacionSerializer(asignacion)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        funcionario = request.data['_value']['funcionario']
        asignacion = Asignacion.objects.get(id=pk)
        func = Funcionario.objects.get(iden=funcionario)
        asignacion.funcionario = func
        asignacion.save()
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
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
    def post(self, request, format=None):
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


####CONTROLADORES DE MANTENIMIENTO
class MantenimientoIndex(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]

    def get(self, request):
        mantenimiento = Mantenimiento.objects.order_by('-timestamps')[:5]
        serializer = MantenimientoSerializer(mantenimiento, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MantenimientoCreate(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]

    def post(self, request, pk, format=None):
        queryset = Elemento.objects.get(placa=pk)
        q = Mantenimiento(elemento=queryset, user=request.user.username, estado='En mantenimiento',
                          descripcion=request.data['details'])
        q.save()
        return Response(status=status.HTTP_201_CREATED)


class MantenimientoDetails(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]

    def get(self, request, pk, format=None):
        queryset = Mantenimiento.objects.get(PID=pk)
        serializer = MantenimientoSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        queryset = Mantenimiento.objects.get(PID=pk)
        elemento = Elemento.objects.get(placa=queryset.elemento.placa)
        if (request.data['estado'] == '1'):
            q = DetallesAsignacion.objects.filter(elemento__placa=queryset.elemento.placa)
            if q:
                elemento.estado = 'Asignado'
            else:
                elemento.estado = 'Por asignar'
        elif (request.data['estado'] == '2'):
            elemento.estado = 'Para cambio'
        elif (request.data['estado'] == '3'):
            elemento.estado = 'Dañado'
        queryset.estado = 'Finalizado'
        queryset.observaciones = request.data['observacion']
        queryset.fechaFin = f'{dt.now().date()} {dt.now().time()}'
        queryset.save()
        elemento.save()
        return Response(status=status.HTTP_200_OK)


"""
Controladores para Bajas
"""


class BajaIndex(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]

    def get(self, request):
        baja = Baja.objects.order_by('-timestamps')[:5]
        serializer = BajaSerializer(baja, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BajaCreate(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]

    def get(self, request, format=None):
        queryset = Elemento.objects.filter(Q(estado__contains='Para cambio') | Q(estado__contains='Dañado') |Q(estado__contains='Para baja'))
        serializer = ElementoViewSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        baja = Baja(user=request.user.username)
        baja.save()
        for item in request.data:
            elemento = Elemento.objects.get(placa=item['placa'])
            q = DetalleBaja(baja=baja,
                            elemento=elemento,
                            fechaBorrado=td(days=5) + dt.now().date())
            elemento.estado = 'De baja'
            elemento.save()
            q.save()
        return Response(status=status.HTTP_201_CREATED)

class BajaDetails(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]
    def get(self, request, pk, format=None):
        queryset = DetalleBaja.objects.filter(baja__PID=pk)
        serializer = DetalleBajaSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk, format=None):
        queryset = DetalleBaja.objects.filter(baja__PID=pk)
        for item in queryset:
            elemento = Elemento.objects.get(placa=item.elemento.placa)
            elemento.estado = 'Por asignar'
            elemento.save()
        queryset.delete()
        q = Baja.objects.get(PID=pk)
        q.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)