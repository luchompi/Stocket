from django.urls import path as p
from . import views as v
from rest_framework.urlpatterns import format_suffix_patterns as fsp

urlpatterns = [
    #APIS de funcionarios
    p('funcionarios/', v.FuncionarioIndex.as_view()),
    p('funcionarios/<str:pk>/', v.FuncionarioDetail.as_view()),
    p('funcionarios/search/<str:pk>/', v.FuncionarioSearch.as_view()),
]

urlpatterns = fsp(urlpatterns)