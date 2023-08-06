from rest_framework.urlpatterns import format_suffix_patterns as fsp
from django.urls import path
from . import views as v

urlpatterns = [
    #URLS de Marcas
    path('marcas/', v.MarcaIndex.as_view()),
    path('marcas/search/<str:pk>/', v.MarcaSearch.as_view()),
    path('marcas/<int:id>/', v.MarcaDetail.as_view()),
    #URLS de categorias
    path('categorias/',v.CategoriaIndex.as_view()),
    path('categorias/search/<str:pk>/',v.CategoriaSearch.as_view()),
    path('categorias/<int:pk>/',v.CategoriaDetail.as_view()),
    #URLS de referencias
    path('referencias/<int:pk>/',v.ReferenciaIndex.as_view()),
    path('referencias/details/<int:pk>/',v.ReferenciaDetail.as_view())
]

urlpatterns = fsp(urlpatterns)