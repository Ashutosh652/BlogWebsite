from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer


# class PostList(APIView):
#     """List all Posts"""

#     permission_classes = (permissions.AllowAny,)

#     def get(self, request):
#         posts = Post.objects.all()
#         serializer = PostListSerializer(posts, many=True)
#         return Response(serializer.data)


class PostList(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (
        SearchFilter,
        OrderingFilter,
    )
    search_fields = ("title", "body", "author__user_name")


class PostCreate(APIView):
    """Create a new post"""

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = PostDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(APIView):
    """Retrieve a detailed post"""

    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(
                {"error": "the requested post does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostDetailSerializer(post)
        return Response(serializer.data)


# class PostDetail(RetrieveAPIView):
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = PostDetailSerializer
#     lookup_field = "pk"


class PostUpdateDelete(APIView):
    """Update and Delete a Post"""

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(
                {"error": "the requested post does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        if request.user == post.author:
            serializer = PostDetailSerializer(post, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "You do not have permission to update this post."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        if request.user == post.author:
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(
                {"error": "You do not have permission to delete this post."},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class MyPosts(APIView):
    """Get a specific user's posts"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request, user_pk, format=None):
        posts = Post.objects.filter(author=user_pk)
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)
