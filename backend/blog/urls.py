from django.urls import path
from . import views

urlpatterns = [
    path("allposts", views.PostList.as_view(), name="posts"),
    path("createpost", views.PostCreate.as_view(), name="create_post"),
    path("post/<int:pk>", views.PostDetail.as_view(), name="detail_post"),
    path("postedit/<int:pk>", views.PostUpdateDelete.as_view(), name="edit_post"),
    path("myposts/<int:user_pk>", views.MyPosts.as_view(), name="myposts"),
]
