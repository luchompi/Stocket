from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views as v

urlpatterns = [
    # URLS para Empresa
    path('', v.EmpresaIndex.as_view()),
    path('<int:pk>/', v.EmpresaDetails.as_view()),
    # URLS para sedes
    path('<int:NIT>/sedes/', v.SedeIndex.as_view()),
    path('<int:NIT>/sedes/<int:pk>/', v.SedeDetails.as_view()),
    # URLS para dependencias
    path('dependencias/', v.DependenciaIndex.as_view()),
    path('dependencias/<int:pk>/', v.DependenciaDetails.as_view()),
    # URLS para sedes por dependencias
    path('sedes/<int:pk>/dependencias/', v.SedeByDependencia.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
