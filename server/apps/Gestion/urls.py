from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns as fsp

from . import views

urlpatterns = [
    ###APIs de Asignaciones
    #Lista de asignaciones y las crea
    path('asignaciones/', views.AsignacionIndex.as_view()),
    #Filtrado de asignaciones por funcionario o id
    path('asignaciones/filter/<int:pk>/', views.AsignacionSearch.as_view()),
    #obtener una asignacion por id
    path('asignaciones/details/<int:pk>/', views.AsignacionDetail.as_view()),
    #obtener elementos de una asignacion
    path('asignaciones/detalles/<int:pk>/', views.DetallesAsignacionDetail.as_view()),
    #obtener elementos disponibles para asignar
    path('asignaciones/detalles/disponibles/', views.DetalleAsignacionSearch.as_view()),
    #obetenr elementos disponibles para asignar por argumentos
    path('asignaciones/detalles/disponibles/args/', views.SearchElementByArgs.as_view()),
]

urlpatterns = fsp(urlpatterns)
