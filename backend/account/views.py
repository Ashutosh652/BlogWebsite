from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_password, login_validation


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            # user = serializer.check_user(data)
            user = login_validation(data)
            if not user:
                return Response(
                    {"error": "Password or Username is incorrect"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    def get(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)


class UsersList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        # serializer = UserSerializer(data=request.data)
        # if serializer.is_valid(raise_exception=True):
        return Response(
            [
                {"username": user.user_name, "password": user.password}
                for user in get_user_model().objects.all()
            ]
        )
