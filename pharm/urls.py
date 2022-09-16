

from posixpath import basename
from django.urls import path
from .views import *
from pharm import views

urlpatterns = [
    path('api/get_all_sources/', views.getAllSources),
    path('api/create_new_source/', views.createNewSource),
    path('api/update_source/', views.updateSource),
    path('api/delete_source/', views.deleteSource),
    path('api/get_all_medicaments/', views.getAllMedicaments),
    path('api/add_medicament/', views.addMedicament),
    path('api/update_medicament/', views.updateMedicament),
    path('api/delete_medicament/', views.deleteMedicament),
    path('api/get_all_stocks/', views.getAllStocks),
    path('api/add_stock/', views.addStock),
    path('api/update_stock/', views.updateStock),
    path('api/delete_stock/', views.deleteStock),
]