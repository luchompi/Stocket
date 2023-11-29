from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views as v

urlpatterns = [
    # URLS para Empresa
    path('', v.EmpresaController.as_view()),
    # URLS para sedes
    path('sedes/', v.SedeController.as_view()),
    path('sedes/<int:pk>/', v.SedeController.as_view()),

    # URLS para dependencias
    path('dependencias/', v.DependenciaController.as_view()),
    path('dependencias/<int:pk>/', v.DependenciaController.as_view()),

    # URLS para sedes por dependencias
    path('sedes/dependencias/', v.SedeDependenciaController.as_view()),
    path('sedes/<int:pk>/dependencias/', v.SedeDependenciaController.as_view()),
    # path('sedes/<int:sede_id>/dependencias/<int:dep_id>/',
    #    v.SedeByDependenciaDetails.as_view()),
    # path('sedes/<sede_id>/dependencias/filtrado/',
    #    v.obtenerDependenciasParaSede.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
