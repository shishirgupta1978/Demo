from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('account.urls')),
    path('helpdesk/', include('helpdesk.urls')),
    path('admin/', admin.site.urls),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header="Admin"
admin.site.site_title="Admin Portal"
admin.site.index_title="Welcome to the Admin Portal"