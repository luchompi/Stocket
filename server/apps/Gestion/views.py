from core.permissions import isAdminOrSuperuser, isEncargado
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Asignacion, DetallesAsignacion
from .serializers import AsignacionSerializer, DetallesAsignacionSerializer


class AsignacionIndex(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]

    def get(self, request):
        asignacion = Asignacion.objects.order_by('timestamps')[:5]
        serializer = AsignacionSerializer(asignacion, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AsignacionDetail(APIView):
    permission_classes = [isAdminOrSuperuser | isEncargado]

    def get(self, request, pk, format=None):
        asignacion = Asignacion.objects.get(pk=pk)
        serializer = AsignacionSerializer(asignacion)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
