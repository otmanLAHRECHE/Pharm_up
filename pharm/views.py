import datetime
from os import stat
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status

# Create your views here.






@api_view(['GET'])
def getAllSources(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Source.objects.all()
        print(queryset)

        source_serial = SourceSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)    


@api_view(['POST'])
def createNewSource(request):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop('name')
        service = request.data.pop('service')

        source = Source.objects.create(name=name, service=service)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateSource(request):
    if request.method == 'POST' and request.user.is_authenticated:
        id = request.data.pop("id")
        name = request.data.pop("name")
        service = request.data.pop("service")
        source_to_update = Source.objects.get(id=id)
        if not source_to_update.name == name:
            source_to_update.name = name
        if not source_to_update.service == service:
            source_to_update.service = service
        
        source_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"source updated"})


@api_view(['DELETE'])
def deleteSource(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Source.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"source deleted"})


@api_view(['GET'])
def getAllMedicaments(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Medicament.objects.all()
        print(queryset)

        source_serial = MedicamentSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)    

@api_view(['POST'])
def addMedicament(request):
    if request.method == 'POST' and request.user.is_authenticated:
        medic_code = request.data.pop("medic_code")
        medic_name = request.data.pop("medic_name")
        medic_dose = request.data.pop("medic_dose")
        dose_unit = request.data.pop("dose_unit")
        medic_place = request.data.pop("medic_place")
        medic_type = request.data.pop("medic_type")

        medicament = Medicament.objects.create(medic_code=medic_code, medic_name=medic_name, medic_dose=medic_dose, dose_unit=dose_unit, medic_place=medic_place, medic_type=medic_type)

        if medicament.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "medicament created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateMedicament(request):
    if request.method == 'POST' and request.user.is_authenticated:
        id = request.data.pop("id")
        medic_code = request.data.pop("medic_code")
        medic_name = request.data.pop("medic_name")
        medic_dose = request.data.pop("medic_dose")
        dose_unit = request.data.pop("dose_unit")
        medic_place = request.data.pop("medic_place")
        medic_type = request.data.pop("medic_type")

        medicament_to_update = Medicament.objects.get(id=id)
        if not medicament_to_update.medic_code == medic_code:
            medicament_to_update.medic_code = medic_code
        if not medicament_to_update.medic_name == medic_name:
            medicament_to_update.medic_name = medic_name
        if not medicament_to_update.medic_dose == medic_dose:
            medicament_to_update.medic_dose = medic_dose
        if not medicament_to_update.dose_unit == dose_unit:
            medicament_to_update.dose_unit = dose_unit
        if not medicament_to_update.medic_place == medic_place:
            medicament_to_update.medic_place = medic_place
        if not medicament_to_update.medic_type == medic_type:
            medicament_to_update.medic_type = medic_type
        
        medicament_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"medicament updated"})


@api_view(['DELETE'])
def deleteMedicament(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Medicament.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Medicament deleted"})




@api_view(['GET'])
def getAllStocks(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Stock.objects.all()

        source_serial = StockSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   
    
@api_view(['POST'])
def addStock(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_medic = request.data.pop("id")
        medicament = Medicament.objects.get(id=id_medic)
        date_a = request.data.pop("date_arrived")
        date_b = request.data.pop("date_expired")
        date_arrived = date_a.split("/")
        date_expired = date_b.split("/")
        stock_qte = request.data.pop("stock_qte")

        if date_arrived >= date_expired : 
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"error":"medicment arrived date is grater than expired date"})
        else:
            date_arrived = datetime.date(int(date_arrived[0]), int(date_arrived[1]), int(date_arrived[2]))
            date_expired = datetime.date(int(date_expired[0]), int(date_expired[1]), int(date_expired[2]))

            

            stock = Stock.objects.create(medicament=medicament, date_arrived=date_arrived, date_expired=date_expired, stock_qte=stock_qte)

            
            if stock.id is not None:
                return Response(status=status.HTTP_201_CREATED, data={"status": "stock created sucsusfully for medicament :" + medicament.medic_name}) 
            
            else:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def updateStock(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id = request.data.pop("id")
        date_a = request.data.pop("date_arrived")
        date_b = request.data.pop("date_expired")
        stock_qte = request.data.pop("stock_qte")

        
        date_arrived = date_a.split("/")
        date_expired = date_b.split("/")

        date_arrived = datetime.date(int(date_arrived[0]), int(date_arrived[1]), int(date_arrived[2]))
        date_expired = datetime.date(int(date_expired[0]), int(date_expired[1]), int(date_expired[2]))

        if date_arrived >= date_expired : 
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"error":"medicment arrived date is grater than expired date"})
        else:

            stock_to_update = Stock.objects.get(id=id)
            if not stock_to_update.date_arrived == date_arrived:
                stock_to_update.date_arrived = date_arrived
            if not stock_to_update.date_expired == date_expired:
                stock_to_update.date_expired = date_expired
            if not stock_to_update.stock_qte == stock_qte:
                stock_to_update.stock_qte = stock_qte
            
            stock_to_update.save()
            
            return Response(status=status.HTTP_200_OK, data = {"status":"stock updated sucsusfully"})



@api_view(['DELETE'])
def deleteStock(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Stock.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Stock deleted"})




@api_view(['GET'])
def getAllBonSorties(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Bon_sortie.objects.all()

        source_serial = BonSortieSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  

@api_view(['POST'])
def addBonSortie(request):
    if request.method == 'POST' and request.user.is_authenticated:

        bon_sortie_nbr = request.data.pop("bon_sortie_nbr")
        id_source = request.data.pop("id")
        date = request.data.pop("date")
        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))
        source = Source.objects.get(id=id_source)

        bon_sortie = Bon_sortie.objects.create(bon_sortie_nbr=bon_sortie_nbr, source=source, date=date)

        if bon_sortie.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Bon sortie created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonSortie(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        bon_sortie_nbr = request.data.pop("bon_sortie_nbr")
        id = request.data.pop("id")
        date = request.data.pop("date")

        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))

        bon_sortie_to_to_update = Bon_sortie.objects.get(id=id)

        if not bon_sortie_to_to_update.bon_sortie_nbr == bon_sortie_nbr:
            bon_sortie_to_to_update.bon_sortie_nbr = bon_sortie_nbr
        if not bon_sortie_to_to_update.date == date:
            bon_sortie_to_to_update.date = date
        
        bon_sortie_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon sortie updated"})


@api_view(['DELETE'])
def deleteBonSortie(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Bon_sortie.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon sortie deleted"})



@api_view(['GET'])
def getAllBonSortieItemsForMedicament(request):
    if request.method == 'GET' and request.user.is_authenticated:
        
        id = request.data.pop("id")
        medicament = Medicament.objects.get(id=id)
        stock = Stock.objects.get(medicament=medicament)
        queryset = Bon_sortie.objects.filter(med_sortie=stock)

        source_serial = BonSortieSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  

@api_view(['POST'])
def addBonSortieItem(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_bon_sortie = request.data.pop("id_bon_sortie")
        id_stock_med = request.data.pop("id_stock_med")
        sortie_qte = request.data.pop("sortie_qte")

        bon_sortie = Bon_sortie.objects.get(id=id_bon_sortie)
        med_sortie = Stock.objects.get(id=id_stock_med)
        
        bon_sortie_item = Sortie_items.objects.create(bon_sortie=bon_sortie, med_sortie=med_sortie, sortie_qte=sortie_qte)

        if bon_sortie_item.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Bon sortie item created sucsusfully for bon sortie of nbr:"+ bon_sortie.bon_sortie_nbr}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonSortieItem(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        id = request.data.pop("id")

        bon_sortie_item_to_update = Sortie_items(id=id)

        sortie_qte = request.data.pop("sortie_qte")

        if not bon_sortie_item_to_update.sortie_qte == sortie_qte:
            bon_sortie_item_to_update.sortie_qte = sortie_qte
        
        bon_sortie_item_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon sortie item updated"})


@api_view(['DELETE'])
def deleteBonSortieItem(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Sortie_items.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon sortie item deleted"})


@api_view(['GET'])
def getAllFournisseurs(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Fournisseur.objects.all()
        print(queryset)

        source_serial = FournisseurSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)    


@api_view(['POST'])
def createNewFournisseur(request):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop('name')
        address = request.data.pop('address')
        email_adress = request.data.pop('email_adress')
        phone_nbr = request.data.pop('phone_nbr')

        fournisseur = Fournisseur.objects.create(name=name, address=address, email_adress=email_adress, phone_nbr=phone_nbr)

        if fournisseur.id is not None:
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateFournisseur(request):
    if request.method == 'POST' and request.user.is_authenticated:
        id = request.data.get('id')
        name = request.data.pop('name')
        address = request.data.pop('address')
        email_adress = request.data.pop('email_adress')
        phone_nbr = request.data.pop('phone_nbr')

        fournisseur_to_update = Fournisseur.objects.get(id=id)
        if not fournisseur_to_update.name == name:
            fournisseur_to_update.name = name
        if not fournisseur_to_update.address == address:
            fournisseur_to_update.address = address
        if not fournisseur_to_update.email_adress == email_adress:
            fournisseur_to_update.email_adress = email_adress
        if not fournisseur_to_update.phone_nbr == phone_nbr:
            fournisseur_to_update.phone_nbr = phone_nbr
        
        fournisseur_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"Fournisseur updated"})


@api_view(['DELETE'])
def deleteFournisseur(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Fournisseur.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Fournisseur deleted"})



@api_view(['GET'])
def getAllBonCommande(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Bon_commande.objects.all()

        source_serial = BonCommandeSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  

@api_view(['POST'])
def addBonCommande(request):
    if request.method == 'POST' and request.user.is_authenticated:

        bon_commande_nbr = request.data.pop("bon_commande_nbr")
        id_fournisseur = request.data.pop("id")
        date = request.data.pop("date")
        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))
        fournisseur = Fournisseur.objects.get(id=id_fournisseur)

        bon_commande = Bon_commande.objects.create(bon_commande_nbr=bon_commande_nbr, fournisseur=fournisseur, date=date)

        if bon_commande.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Bon commande created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonCommande(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        bon_commande_nbr = request.data.pop("bon_commande_nbr")
        id = request.data.pop("id")
        date = request.data.pop("date")

        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))

        bon_commande_to_to_update = Bon_commande.objects.get(id=id)

        if not bon_commande_to_to_update.bon_commande_nbr == bon_commande_nbr:
            bon_commande_to_to_update.bon_commande_nbr = bon_commande_nbr
        if not bon_commande_to_to_update.date == date:
            bon_commande_to_to_update.date = date
        
        bon_commande_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon commande updated"})


@api_view(['DELETE'])
def deleteBonCommande(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Bon_commande.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon commande deleted"})


@api_view(['POST'])
def addBonCommandeItem(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_bon_commande = request.data.pop("id_bon_commande")
        id_med = request.data.pop("id_med")
        commande_qte = request.data.pop("commande_qte")

        bon_commande = Bon_commande.objects.get(id=id_bon_commande)
        medicament = Medicament.objects.get(id=id_med)
        
        bon_commande_item = Commande_items.objects.create(bon_commande=bon_commande, medicament=medicament, commande_qte=commande_qte)

        if bon_commande_item.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Bon commande item created sucsusfully for bon commande of nbr:"+ bon_commande.bon_commande_nbr}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonCommandeItem(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        id = request.data.pop("id")

        bon_commande_item_to_update = Commande_items(id=id)

        commande_qte = request.data.pop("commande_qte")

        if not bon_commande_item_to_update.commande_qte == commande_qte:
            bon_commande_item_to_update.commande_qte = commande_qte
        
        bon_commande_item_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon commande item updated"})


@api_view(['DELETE'])
def deleteBonCommandeItem(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Commande_items.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon commande item deleted"})



@api_view(['GET'])
def getAllArivage(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Arivage.objects.all()

        arivage_serializer = ArivageSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=arivage_serializer.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 



@api_view(['POST'])
def addArivage(request):
    if request.method == 'POST' and request.user.is_authenticated:

        source_detail = request.data.pop("source_detail")
        date = request.data.pop("date")
        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))

        arivage = Arivage.objects.create(source_detail=source_detail, date=date)

        if arivage.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Arivage created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateArivage(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        source_detail = request.data.pop("source_detail")
        date = request.data.pop("date")

        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))

        arivage_to_to_update = Arivage.objects.get(id=id)

        if not arivage_to_to_update.source_detail == source_detail:
            arivage_to_to_update.source_detail = source_detail
        if not arivage_to_to_update.date == date:
            arivage_to_to_update.date = date
        
        arivage_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"Arivage updated"})


@api_view(['DELETE'])
def deleteArivage(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Arivage.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Arivage deleted"})


@api_view(['POST'])
def addArivageItem(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_arivage = request.data.pop("id_arivage")
        id_medicament = request.data.pop("id_medicament")
        date = request.data.pop("date_expired")
        qnt = request.data.pop("qnt")

        date = date.split("/")
        date_expired = datetime.date(int(date[0], int(date[1])), int(date[2]))

        arivage = Arivage.objects.get(id=id_arivage)
        medicament = Medicament.objects.get(id=id_medicament)

        arivage_item = Arivage_items.objects.create(arivage=arivage, medicament=medicament, date_expired=date_expired, qnt=qnt)

        if arivage_item.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Arivage item created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateArivageItem(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        id = request.data.pop("id")
        date = request.data.pop("date_expired")
        qnt = request.data.pop("qnt")

        date = date.split("/")
        date_expired = datetime.date(int(date[0], int(date[1])), int(date[2]))


        Arivage_item_to_to_update = Arivage_items.objects.get(id=id)

        if not Arivage_item_to_to_update.qnt == qnt:
            Arivage_item_to_to_update.qnt = qnt
        if not Arivage_item_to_to_update.date_expired == date_expired:
            Arivage_item_to_to_update.date_expired = date_expired
        
        Arivage_item_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"Arivage item updated"})


@api_view(['DELETE'])
def deleteArivageItem(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Arivage_items.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Arivage item deleted"})






