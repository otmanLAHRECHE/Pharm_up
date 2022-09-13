from email.headerregistry import Address
from tkinter import CASCADE
from django.db import models

# Create your models here.



class Source(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    service = models.CharField(max_length=100)

    def __str__(self):
        return self.name



class Bon_sortie(models.Model):
    id = models.AutoField(primary_key=True)
    bon_sortie_nbr = models.IntegerField()
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return self.id


class Medicament(models.Model):
    id = models.AutoField(primary_key=True)
    medic_code = models.CharField(max_length=100)
    medic_name = models.CharField(max_length=100)
    medic_dose = models.CharField(max_length=50)
    dose_unit = models.CharField(max_length=50)
    medic_place = models.CharField(max_length=100)

    def __str__(self):
        return self.medic_code

class Stock(models.Model):
    id = models.AutoField(primary_key=True)
    medicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    date_arrived = models.DateField()
    date_expired = models.DateField()
    stock_qte = models.IntegerField()

    def __str__(self):
        return self.id


class Sortie_items(models.Model):
    id = models.AutoField(primary_key=True)
    bon_sortie = models.ForeignKey(Bon_sortie, on_delete=models.CASCADE)
    med_sortie = models.ForeignKey(Stock, on_delete=models.CASCADE)
    sortie_qte = models.IntegerField() 

    def __str__(self):
        return self.id   


class Fournisseur(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    email_adress = models.CharField(max_length=100)
    phone_nbr = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Bon_commande(models.Model):
    id = models.AutoField(primary_key=True)
    bon_commande_nbr = models.IntegerField()
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return self.id


class Commande_items(models.Model):
    id = models.AutoField(primary_key=True)
    bon_commande = models.ForeignKey(Bon_commande, on_delete=models.CASCADE)
    medicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    commande_qte = models.IntegerField() 

    def __str__(self):
        return self.id  

class Arivage(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField()
    source_detail = models.CharField(max_length=100)

    def __str__(self):
        return self.id 

class Arivage_items(models.Model):
    id = models.AutoField(primary_key=True)
    arivage = models.ForeignKey(Arivage, on_delete=models.CASCADE)
    medicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    date_expired = models.DateField()
    qnt = models.IntegerField()

    def __str__(self):
        return self.id 







