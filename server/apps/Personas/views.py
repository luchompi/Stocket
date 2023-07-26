from apps.Empresa.models import Sede
from core.permissions import isAdminOrSuperuser, isEncargado
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Funcionario, Proveedores
from .serializers import FuncionarioPreviewSerializer, FuncionarioSerializer, FuncionarioStoreSerializer, \
	ProveedorSerializerPreview, ProveedorSerializer


class FuncionarioIndex(APIView):
	@permission_classes([isAdminOrSuperuser | isEncargado])
	def get(self, request, format=None):
		funcionarios = Funcionario.objects.order_by('-iden')[:5]
		serializer = FuncionarioPreviewSerializer(funcionarios, many=True)
		return Response(serializer.data)

	@permission_classes([isAdminOrSuperuser | isEncargado])
	def post(self, request, format=None):
		myData = request.data.copy()
		queryset = Sede.objects.get(Q(name__exact=request.data.get('sede')) | Q(id__exact=request.data.get('sede')))
		myData['sede'] = queryset.id
		serializer = FuncionarioStoreSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FuncionarioDetail(APIView):
	@permission_classes([isAdminOrSuperuser | isEncargado])
	def get(self, request, pk, format=None):
		funcionario = get_object_or_404(Funcionario, iden=pk)
		serializer = FuncionarioSerializer(funcionario)
		return Response(serializer.data)

	@permission_classes([isAdminOrSuperuser | isEncargado])
	def put(self, request, pk, format=None):
		funcionario = get_object_or_404(Funcionario, iden=pk)
		myData = request.data.copy()
		queryset = Sede.objects.get(name__exact=request.data.get('sede'))
		myData['sede'] = queryset.id
		serializer = FuncionarioSerializer(funcionario, data=myData, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	@permission_classes([isAdminOrSuperuser | isEncargado])
	def delete(self, request, pk, format=None):
		queryset = get_object_or_404(Funcionario, iden=pk)
		queryset.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


class FuncionarioSearch(APIView):
	@permission_classes([isAdminOrSuperuser | isEncargado])
	def get(self, request, pk, format=None):
		queryset = Funcionario.objects.filter(
			Q(iden__icontains=pk) | Q(first_name__icontains=pk) | Q(last_name__icontains=pk))
		serializer = FuncionarioPreviewSerializer(queryset, many=True)
		return Response(serializer.data)


# Proveedores Controllers
class ProveedoresIndex(APIView):
	@permission_classes([isAdminOrSuperuser | isEncargado])
	def get(self, request, format=None):
		proveedores = Proveedores.objects.order_by('-created_at')[:5]
		serializer = ProveedorSerializerPreview(proveedores, many=True)
		return Response(serializer.data)

	@permission_classes([isAdminOrSuperuser | isEncargado])
	def post(self, request, format=None):
		serializer = ProveedorSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProveedoresDetail(APIView):
	@permission_classes([isAdminOrSuperuser | isEncargado])
	def get(self, request, pk, format=None):
		proveedor = get_object_or_404(Proveedores, NIT=pk)
		serializer = ProveedorSerializer(proveedor)
		return Response(serializer.data)

	@permission_classes([isAdminOrSuperuser | isEncargado])
	def put(self, request, pk, format=None):
		print("Actualizando")
		proveedor = get_object_or_404(Proveedores, NIT=pk)
		serializer = ProveedorSerializer(proveedor, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	@permission_classes([isAdminOrSuperuser | isEncargado])
	def delete(self, request, pk, format=None):
		queryset = get_object_or_404(Proveedores, NIT=pk)
		queryset.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
	
class SearchProveedor(APIView):
	@permission_classes([isAdminOrSuperuser | isEncargado])
	def get(self, request, pk, format=None):
		queryset = Proveedores.objects.filter(
			Q(NIT__icontains=pk) | Q(razonSocial__icontains=pk))
		serializer = ProveedorSerializerPreview(queryset, many=True)
		return Response(serializer.data)