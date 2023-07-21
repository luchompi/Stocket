from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    #APIS para autenticacion
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.jwt')),
    #APIS para Empresa
    path('api/v1/empresa/', include('apps.Empresa.urls')),
    #APIS para Personas
    path('api/v1/personas/', include('apps.Personas.urls')),
]
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]