from celery import shared_task
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


@shared_task(bind=True)
def send_email(self,subject,message,recipient_list,*args,**kwargs):
   
        #print(timezone.localdate(user.d)+timedelta(days=0))
        #print("Date of birth:"+str(timezone.localdate(user.date_of_birth)))
        
    send_mail(subject=str(subject),message=message,from_email=settings.EMAIL_HOST_USER,recipient_list=recipient_list,fail_silently=True)

    return "Done"

