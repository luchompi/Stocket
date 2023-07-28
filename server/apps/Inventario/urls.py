from rest_framework.urlpatterns import format_suffix_patterns as fsp
from django.urls import path
from . import views as v

urlpatterns = [
    #URLS de Marcas
    path('marcas/', v.MarcaIndex.as_view()),
    path('marcas/search/<str:pk>/', v.MarcaSearch.as_view()),
    path('marcas/<int:id>/', v.MarcaDetail.as_view()),
]

urlpatterns = fsp(urlpatterns)