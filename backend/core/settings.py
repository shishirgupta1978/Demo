import os
from pathlib import Path
import json
from datetime import timedelta


BASE_DIR = Path(__file__).resolve().parent.parent

data=None
envfile= BASE_DIR.parent / r"env.json"
if os.path.exists(envfile):
    with open(envfile) as f:
        data = json.load(f)
        f.close()
    production_env=""
    for k in data:
        production_env=production_env+k+"="+data[k][0]+"\r\n"

    
    with open(BASE_DIR / "prod.env","w") as f:
        f.write(production_env)
        f.close()

def get_env(mykey):
    if(data is not None):
        return data[mykey][1]
    else:
        return(os.getenv(mykey))



DEBUG = int(get_env("DEBUG"))

SECRET_KEY = get_env("SECRET_KEY")



ALLOWED_HOSTS = get_env("ALLOWED_HOSTS").split(',')
LOGOUT_REDIRECT_URL='/'
LOGIN_REDIRECT_URL='/'
LOGIN_URL='/login/'
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'djoser',
    'account',
    'helpdesk',
    'django_celery_results',
    'django_celery_beat',
    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
AUTH_USER_MODEL = 'account.User'
ROOT_URLCONF = 'core.urls'

SECURE_CROSS_ORIGIN_OPENER_POLICY=None
CORS_ALLOW_ALL_ORIGINS = True


CSRF_TRUSTED_ORIGINS =get_env("CSRF_TRUSTED_ORIGINS").split(',') 

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'
#ASGI_APPLICATION = 'core.asgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [(get_env("REDIS_HOST"),int(get_env("REDIS_PORT")) )],
        },
    },
}



DATABASES = {

        'default':{
     
                "ENGINE": get_env("DB_ENGINE"),
                "NAME": get_env("DB_DATABASE"),
                "USER": get_env("DB_USER"),
                "PASSWORD": get_env("DB_PASSWORD"),
                "HOST": get_env("DB_HOST"),
                "PORT": get_env("DB_PORT"),
                }
    
    #env.db(),
    

}


CACHES1 = {
 #   'default': env.cache(),

  #  'redis': env.cache_url('REDIS_URL')
}



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True



STATIC_URL = 'static/'

STATIC_ROOT = BASE_DIR / "static"
STATICFILESDIR = []
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}


EMAIL_BACKEND=get_env('EMAIL_BACKEND')
EMAIL_HOST=get_env('EMAIL_HOST')
EMAIL_USE_TLS=int(get_env('EMAIL_USE_TLS'))
EMAIL_PORT=int(get_env('EMAIL_PORT'))
EMAIL_HOST_USER=get_env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD=get_env('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL=get_env('DEFAULT_FROM_EMAIL')
DOMAIN=get_env('DOMAIN')
SITE_NAME=get_env('SITE_NAME')


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=int(get_env('ACCESS_TOKEN_LIFETIME_MINUTES'))),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=int(get_env('REFRESH_TOKEN_LIFETIME_DAYS'))),
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=int(get_env('ACCESS_TOKEN_LIFETIME_MINUTES'))),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=int(get_env('REFRESH_TOKEN_LIFETIME_DAYS'))),

}

DJOSER = {
    'LOGIN_FIELD': 'email',
    "USER_CREATE_PASSWORD_RETYPE":True,
    "USERNAME_CHANGED_EMAIL_CONFIRMATION":True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION":True,
    "SEND_CONFIRMATION_EMAIL":True,
    "PASSWORD_RESET_CONFIRM_URL":"password/reset/confirm/{uid}/{token}",
    "SET_PASSWORD_RETYPE":True,
    "PASSWORD_RESET_CONFIRM_RETYPE":True,
    "USERNAME_RESET_CONFIRM_URL":"email/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL":"activate/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL":True,
    'SERIALIZERS': {'user': 'account.serializers.UserSerializer',
                    'current_user': 'account.serializers.UserSerializer',
                    },
    'USER_ID_FIELD':'id'
}

RAZOR_PAY_KEY = get_env("RAZOR_PAY_KEY")
RAZOR_PAY_SECRET_KEY = get_env("RAZOR_PAY_SECRET_KEY")


CELERY_BROKER_URL=get_env("CELERY_BROKER_URL")
CELERY_ACCEPT_CONTENT=["application/json"]
CELERY_RESULT_SERIALIZER="json"
CELERY_TASK_SERIALIZER="json"
CELERY_TIMEZONE="Asia/Kolkata"
CELERY_RESULT_BACKEND='django-db'


CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'