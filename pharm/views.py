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




class SourceViewSet(viewsets.ModelViewSet):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return Source.objects.all() 
        raise PermissionDenied()
    
    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()


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


@api_view(['POST'])
def addMedicament(request):
    if request.method == 'POST' and request.user.is_authenticated:
        medic_code = request.data.pop("medic_code")
        medic_name = request.data.pop("medic_name")
        medic_dose = request.data.pop("medic_dose")
        dose_unit = request.data.pop("dose_unit")
        medic_place = request.data.pop("medic_place")

        medicament = Medicament.objects.create(medic_code=medic_code, medic_name=medic_name, medic_dose=medic_dose, dose_unit=dose_unit, medic_place=medic_place)

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
        
        medicament_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"medicament updated"})


@api_view(['DELETE'])
def deleteMedicament(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Medicament.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Medicament deleted"})

    


