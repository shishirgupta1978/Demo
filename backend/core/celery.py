from __future__ import absolute_import,unicode_literals
from django.conf import settings
import os

from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery('core')

app.conf.enable_utc= False
app.conf.update(timezone = 'Asia/Kolkata')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.beat_schedule={
#'send-mail-at-9-pm':{'task':'celeryapp.tasks.send_email',
#'schedule': crontab(hour=9, minute=45),
#'args':[]}    
}

app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')