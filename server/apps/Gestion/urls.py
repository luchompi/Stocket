from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns as fsp

from . import views

urlpatterns = [
    path('asignaciones/', views.AsignacionIndex.as_view()),
    path('asignaciones/filter/<int:pk>/', views.AsignacionSearch.as_view()),
    path('asignaciones/details/<int:pk>/', views.AsignacionDetail.as_view()),
    path('asignaciones/detalles/<int:pk>/', views.DetallesAsignacionDetail.as_view()),
]

urlpatterns = fsp(urlpatterns)
