from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()


def custom_validation(data):
    # print("........................................................................")
    # print(data)
    # print("........................................................................")
    user_name = data["user_name"].strip()
    password = data["password"].strip()

    if not password or len(password) < 8:
        raise ValidationError("choose another password, min 8 characters")

    if not user_name:
        raise ValidationError("Username is a required field.")

    if UserModel.objects.filter(user_name=user_name).exists():
        raise ValidationError("Username already exists.")

    return data


def validate_username(data):
    user_name = data["user_name"].strip()
    if not user_name:
        raise ValidationError("choose another username")
    return True


def validate_password(data):
    password = data["password"].strip()
    if not password:
        raise ValidationError("a password is needed")
    return True


def login_validation(data):
    password = data.pop("password", None)
    user = authenticate(username=data["user_name"], password=password)
    if not user:
        return False
    return user
