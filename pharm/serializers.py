

from dataclasses import fields
from rest_framework import serializers
from models import *


class SortieItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sortie_items
        fields = ['id', 'sortie_qte']

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'date_arrived', 'date_expired', 'stock_qte']


class StockBonSortieSerializer(serializers.ModelSerializer):
    sortie_item = SortieItemsSerializer()

    class Meta:
        model = Stock
        fields = ['id', 'date_arrived', 'date_expired', 'stock_qte', 'sortie_item']


class BonSortie(serializers.ModelSerializer):
    sortie_items = 
    class Meta:
        model = Bon_sortie
        fields = ['id', 'bon_sortie_nbr', 'date']

