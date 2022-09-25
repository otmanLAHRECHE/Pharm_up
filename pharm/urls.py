

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
    path('api/get_selected_medicament/', views.getSelectedMedicament),
    path('api/add_medicament/', views.addMedicament),
    path('api/update_medicament/', views.updateMedicament),
    path('api/delete_medicament/', views.deleteMedicament),
    path('api/get_all_stocks/', views.getAllStocks),
    path('api/add_stock/', views.addStock),
    path('api/update_stock/', views.updateStock),
    path('api/delete_stock/', views.deleteStock),
    path('api/get_all_bon_sortie/', views.getAllBonSorties),
    path('api/add_bon_sortie/', views.addBonSortie),
    path('api/update_bon_sortie/', views.updateBonSortie),
    path('api/delete_bon_sortie/', views.deleteBonSortie),
    path('api/get_all_bon_sortie_items_for_medic/', views.getAllBonSortieItemsForMedicament),
    path('api/add_bon_sortie_item/', views.addBonSortieItem),
    path('api/update_bon_sortie_item/', views.updateBonSortieItem),
    path('api/delete_bon_sortie_item/', views.deleteBonSortieItem),
    path('api/get_all_fournisseurs/', views.getAllFournisseurs),
    path('api/add_fournisseurs/', views.createNewFournisseur),
    path('api/update_fournisseurs/', views.updateFournisseur),
    path('api/delete_fournisseurs/', views.deleteFournisseur),
    path('api/get_all_bon_commande/', views.getAllBonCommande),
    path('api/add_bon_commande/', views.addBonCommande),
    path('api/update_bon_commande/', views.updateBonCommande),
    path('api/delete_bon_commande/', views.deleteBonCommande),
    path('api/add_bon_commande_item/', views.addBonCommandeItem),
    path('api/update_bon_commande_item/', views.updateBonCommandeItem),
    path('api/delete_bon_commande_item/', views.deleteBonCommandeItem),
    path('api/get_all_arivage/', views.getAllArivage),
    path('api/add_arivage/', views.addArivage),
    path('api/update_arivage/', views.updateArivage),
    path('api/delete_arivage/', views.deleteArivage),
    path('api/add_arivage_item/', views.addArivageItem),
    path('api/update_arivage_item/', views.updateArivageItem),
    path('api/delete_arivage_item/', views.deleteArivageItem),
]