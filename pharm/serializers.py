

from dataclasses import fields
from rest_framework import serializers
from .models import *





class MedicamentSerialize(serializers.ModelSerializer):

    class Meta:
        model = Medicament
        fields = ['id', 'medic_code', 'medic_name', 'medic_dose', 'dose_unit', 'medic_place', 'medic_type']

class MedicamentListSerialize(serializers.ModelSerializer):
    label = serializers.CharField(source='medic_name')
    class Meta:
        model = Medicament
        fields = ['id', 'label']


class StockSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerialize()
    class Meta:
        model = Stock
        fields = ['id', 'date_arrived', 'date_expired', 'stock_qte', 'medicament']

class StockArrivageMedicSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source = 'arrivage') 
    class Meta:
        model = Stock
        fields = ['id', 'label']





class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ['id', 'name', 'service']

class SourceSelectSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source = 'desrination') 
    class Meta:
        model = Stock
        fields = ['id', 'label']


class SortieItemsSerializer(serializers.ModelSerializer):
    med_sortie = StockSerializer()
    class Meta:
        model = Sortie_items
        fields = ['id', 'sortie_qte', 'med_sortie']

class BonSortieCustomSerializer(serializers.ModelSerializer):
    source = SourceSerializer()
    class Meta:
        model = Bon_sortie
        fields = ['id', 'source', 'bon_sortie_nbr', 'date']

class SortieItemsCustomSerializer(serializers.ModelSerializer):
    med_sortie = StockSerializer()
    bon_sortie = BonSortieCustomSerializer()
    class Meta:
        model = Sortie_items
        fields = ['id', 'sortie_qte', 'med_sortie', 'bon_sortie']

class BonSortieSerializer(serializers.ModelSerializer):
    source = SourceSerializer()
    sortie_items_set = SortieItemsSerializer(many=True)
    class Meta:
        model = Bon_sortie
        fields = ['id', 'source', 'bon_sortie_nbr', 'date', 'sortie_items_set']

class BonSortieTestSerializer(serializers.ModelSerializer):
    source_set = SourceSerializer()
    sortie_items_set = SortieItemsSerializer(many=True)
    class Meta:
        model = Bon_sortie
        fields = ['id', 'source_set', 'bon_sortie_nbr', 'date', 'sortie_items_set']


class FournisseurSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fournisseur
        fields = ['id', 'name', 'address', 'email_adress', 'phone_nbr']


class CommandeItemsSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerialize()
    class Meta:
        model = Sortie_items
        fields = ['id', 'commande_qte', 'medicament']


class BonCommandeSerializer(serializers.ModelSerializer):
    fournisseur = FournisseurSerializer()
    commande_items = CommandeItemsSerializer(many=True)
    class Meta:
        model = Bon_sortie
        fields = ['id', 'fournisseur', 'bon_commande_nbr', 'date', 'commande_items']


class ArivageItemsSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerialize()

    class Meta:
        model = Arivage_items
        fields = ['id', 'medicament', 'date_expired', 'qnt']


class ArivageSerializer(serializers.ModelSerializer):
    arivage_items = ArivageItemsSerializer(many=True)

    class Meta:
        model = Arivage
        fields = ['id', 'date', 'source_detail', 'arivage_items']















