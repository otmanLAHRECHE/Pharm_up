

from dataclasses import fields
from rest_framework import serializers
from .models import *





class MedicamentSerialize(serializers.ModelSerializer):

    class Meta:
        model = Medicament
        fields = ['id', 'medic_code', 'medic_name', 'medic_dose', 'dose_unit', 'medic_place', 'medic_type']

class StockSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerialize()
    class Meta:
        model = Stock
        fields = ['id', 'date_arrived', 'date_expired', 'stock_qte', 'medicament']

class SortieItemsSerializer(serializers.ModelSerializer):
    stock_item = StockSerializer()
    class Meta:
        model = Sortie_items
        fields = ['id', 'sortie_qte', 'stock_item']


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ['id', 'name', 'service']


class BonSortieSerializer(serializers.ModelSerializer):
    source = SourceSerializer()
    sortie_items = SortieItemsSerializer(many=True)
    class Meta:
        model = Bon_sortie
        fields = ['id', 'source', 'bon_sortie_nbr', 'date', 'sortie_items']


class FournisseurSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fournisseur
        fields = ['id', 'name', 'address', 'email_adress', 'phone_nbr']















