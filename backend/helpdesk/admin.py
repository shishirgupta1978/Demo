from django.contrib import admin
from .models import Department,Ticket,Note
# Register your models here.
admin.site.register(Ticket)
admin.site.register(Note)
admin.site.register(Department)