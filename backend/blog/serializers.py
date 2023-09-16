from rest_framework import serializers
from .models import Post


class PostListSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField(source="get_author_name")

    class Meta:
        model = Post
        fields = "__all__"
        # exclude = ("body",)

    def get_author_name(self, obj):
        return obj.author.user_name


class PostDetailSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField(source="get_author_name")

    class Meta:
        model = Post
        fields = "__all__"

    def get_author_name(self, obj):
        return obj.author.user_name
