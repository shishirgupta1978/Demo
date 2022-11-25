# install redis
sudo apt install lsb-release
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis

#install redis,celery in django
pip install redis
pip install celery

celery -A config.celery worker -l info


#for windwow use:
celery -A config.celery worker -l --pool=solo info


pip install django-celery-results

add 'django_celery_results' in installed app in settings.py


makemigration


pip install django-celery-beat

add in setting.py 'django_celery_beat'


run command
celery -A config beat -l --pool=solo info
