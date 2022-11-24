from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Profile(models.Model):
    user= models.OneToOneField(get_user_model(),related_name='profile', on_delete=models.CASCADE)
    firstname=models.CharField(max_length=100,null=True,blank=True)
    lastname=models.CharField(max_length=100,null=True,blank=True)
    pic=models.ImageField(upload_to='img',blank=True,null=True)
    documents=models.FileField(upload_to='document',blank=True,null=True)
    def __str__(self):
        return f"{self.user.username}'s Profile"

class Friend(models.Model):
    profile=models.OneToOneField(Profile, on_delete=models.CASCADE)
    friends=models.ManyToManyField(Profile,related_name="friends")
    def __str__(self):
        return self.profile.nickname

class Address(models.Model):
    profile=models.ForeignKey(Profile,on_delete=models.CASCADE)
    address = models.TextField()
    def __str__(self):
        return self.address

class Manager(models.Model):
    profile=models.OneToOneField(Profile, on_delete=models.CASCADE)
    manager=models.ForeignKey(Profile,on_delete=models.SET_NULL,related_name="managers",null=True)
    def __str__(self):
        return self.profile.nickname
