from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.core.files.base import ContentFile
from django.utils import timezone


# ....................CUSTOM USER MODEL...........................
class AccountManager(BaseUserManager):
    def create_superuser(self, user_name, password, **other_fields):
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)
        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff=True")
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned to is_superuser=True")
        return self.create_user(user_name, password, **other_fields)

    def create_user(self, user_name, password, **other_fields):
        if not user_name:
            raise ValueError("Users must provide a username.")
        user = self.model(user_name=user_name, **other_fields)
        user.set_password(password)
        user.save()


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=100, unique=True)
    date_joined = models.DateTimeField(default=timezone.now, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(
        default=True
    )  # represents if the account of the user is active or inactive due to different reasons
    is_superuser = models.BooleanField(default=False)
    date_of_birth = models.DateField(null=True, blank=True)

    objects = AccountManager()

    USERNAME_FIELD = "user_name"
    # REQUIRED_FIELDS = [
    #     "user_name",
    # ]

    def __str__(self):
        return self.user_name

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_superuser


# ....................CUSTOM USER MODEL...........................
