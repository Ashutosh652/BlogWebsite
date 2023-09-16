from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}}
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user_obj = self.Meta.model(**validated_data)
        if password is not None:
            user_obj.set_password(password)
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField()

    class Meta:
        model = UserModel
        fields = ("user_name",)

    def check_user(self, validated_data):
        password = validated_data.pop("password", None)
        user = authenticate(username=validated_data["user_name"], password=password)
        if not user:
            raise ValidationError("user not found")
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        # fields = ("user_name",)
        fields = "__all__"
