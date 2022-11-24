from django.db import models
from account.models import User

# Create your models here.
class Department(models.Model):
    name=models.CharField(max_length=250)
    users=models.ManyToManyField(User,related_name='department',blank=True)
    
    def __str__(self):
        return self.name

class Ticket(models.Model):
    user = models.ForeignKey(User,on_delete= models.CASCADE, related_name='user_ticket')
    title=models.CharField(max_length=255)
    description=models.TextField(blank=True,null=True)
    attachment=models.FileField(upload_to='notes/',null=True,blank=True)
    department=models.ForeignKey(Department,on_delete=models.CASCADE,related_name='department_ticket')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assign_to = models.ForeignKey(User,on_delete= models.CASCADE,related_name='assign_ticket',null=True,blank=True)
    resolved =models.BooleanField(default=False)
    def __str__(self):
        return f"{self.title}({self.department})"

class Note(models.Model):
    user =models.ForeignKey(User,on_delete= models.CASCADE,related_name='user_note')
    text = models.TextField()
    ticket=models.ForeignKey(Ticket,models.CASCADE,related_name='notes')
    time= models.DateTimeField(auto_now_add=True)
    attachment=models.FileField(upload_to='notes/',null=True,blank=True)
    
    def __str__(self):
        return f"{self.user} reply against {self.ticket}"


