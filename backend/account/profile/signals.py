from django.db.models.signals import post_save
from core.settings import AUTH_USER_MODEL

from django.dispatch import receiver
from .models import Profile

@receiver(post_save, sender=AUTH_USER_MODEL)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=AUTH_USER_MODEL)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()

