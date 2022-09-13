

from posixpath import basename
from django.urls import path
from .views import *
from pharm import views

urlpatterns = [
    path('api/source_api/', SourceViewSet.as_view),
    path('api/get_all_sources/', views.getAllSources),
    path('api/create_new_source/', views.createNewSource),
  
]