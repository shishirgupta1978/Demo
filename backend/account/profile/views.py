from django.shortcuts import render
from rest_framework import viewsets,permissions,status,serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from django.http import Http404

# Create your views here.
from .serializers import ProfileSerializer
from django.contrib.auth import get_user_model

class ProfileAPIView(APIView):
    """
    API endpoint that allows users's profile to be edited.
    """
    permission_classes= [permissions.IsAuthenticated]
    def get_object(self,request):
        try:
            print(request)
            return Profile.objects.get(user = request.user.id)
        except Profile.DoesNotExist:
            raise Http404


    def patch(self, request, *args, **kwargs):
        
        profile = self.get_object(request)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
