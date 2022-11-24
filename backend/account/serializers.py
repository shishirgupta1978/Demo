from rest_framework import serializers
from core.settings import AUTH_USER_MODEL
from django.contrib.auth import get_user_model
from account.profile.serializers import ProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(read_only=True)
    
    class Meta:
        model =  get_user_model()
        fields = ['username','date_of_birth','email', 'password','profile']
        extra_kwargs = {
            'password': {'write_only': True}
        }



