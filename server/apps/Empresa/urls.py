from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views as v

urlpatterns = [
    #URLS para Empresa
    path('', v.EmpresaIndex.as_view()),
    path('<int:pk>/', v.EmpresaDetails.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)