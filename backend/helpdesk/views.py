from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from .models import Department,Ticket,Note
from .serializers import DepartmentSerializer,TicketSerializer,NoteSerializer
from rest_framework.pagination import PageNumberPagination
from .tasks import send_email
from django_celery_beat.models import PeriodicTask,CrontabSchedule
import json



class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.filter().order_by("-id")
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]


class TicketListAPIView(APIView, PageNumberPagination):
    permission_classes= [permissions.IsAuthenticated]
    page_size=3
    def get_object(self, pk,request):
        try:
            return Ticket.objects.get(pk=pk,user = request.user.id)
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request,id=None, *args, **kwargs):
        '''
        List all the Tickets for given requested user
        '''
        tickets = Ticket.objects.filter(user = request.user.id).order_by("-id")
        if id is not None:
            
            ticket= self.get_object(pk=id,request=request)
            serializer = TicketSerializer(ticket)
            return Response(serializer.data, status=status.HTTP_200_OK)

        
        results = self.paginate_queryset(tickets, request, view=self)

        serializer = TicketSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

        #return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        '''
        Create the Ticket with given ticket data
        '''
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            ticket=serializer.save()
            dep =request.data.get("department")
            users=Department.objects.get(id=dep).users.all()
            email_lst=[user.email for user in users]
            send_email.delay(subject=f"Helpdesk Support ticket #{ticket.id}: {ticket.title}",message=f"Ticket id #{ticket.id}\n\n{request.data.get('description')}",recipient_list=email_lst)
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    def put(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')

        ticket = self.get_object(pk,request)
        
        serializer = TicketSerializer(ticket,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, id, *args, **kwargs):
        
        if(id is not None):
            ticket = self.get_object(id,request)
            
   
            serializer = TicketSerializer(ticket, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DepartmentTicketListAPIView(APIView,PageNumberPagination):
    permission_classes= [permissions.IsAuthenticated]
    page_size=3
    def get_object(self, pk,request,lst):
        try:
            T=Ticket.objects.get(pk=pk,department__in = lst)
            if(T.user.id==request.user.id):
                raise Http404
            return T
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request,id=None, *args, **kwargs):
        '''
        List all the Tickets for given requested user
        '''
        department_list = request.user.department.all()
        
   
        tickets = Ticket.objects.filter(department__in = department_list).exclude(user=request.user.id).order_by("-id")

        if id is not None:
            
            ticket= self.get_object(pk=id,request=request,lst=department_list)
            serializer = TicketSerializer(ticket)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        results = self.paginate_queryset(tickets, request, view=self)

        serializer = TicketSerializer(results, many=True)

        return self.get_paginated_response(serializer.data)
    
    def patch(self, request, id, *args, **kwargs):
        
        if(id is not None):
            ticket = self.get_object(id,request,request.user.department.all())
            
   
            serializer = TicketSerializer(ticket, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
class DepartmentListAPIView(APIView):
    permission_classes= [permissions.IsAuthenticated]
 
    def get(self, request, id=None, *args, **kwargs):
        '''
        List all the Tickets for given requested user
        '''
        departments = Department.objects.all()
   
        
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



# Create your views here.


class NoteListAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        '''
        Create the Ticket with given ticket data
        '''
        
        serializer = NoteSerializer(data=request.data)
        
        ticket=Ticket.objects.get(pk=request.data.get('ticket'))
        if(request.user.id!=ticket.user.id):
            ticket.assign_to=request.user
            ticket.save()

        
        


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
