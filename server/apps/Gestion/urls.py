from rest_framework.urlpatterns import format_suffix_patterns as fsp
from django.urls import path
from . import views

urlpatterns = [
]

urlpatterns = fsp(urlpatterns)