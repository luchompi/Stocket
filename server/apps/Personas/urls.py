from django.urls import path as p
from . import views as v
from rest_framework.urlpatterns import format_suffix_patterns as fsp

urlpatterns = [
    p('funcionarios/', v.FuncionarioIndex.as_view()),
]

urlpatterns = fsp(urlpatterns)