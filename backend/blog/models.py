from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class Post(models.Model):
    title = models.CharField(
        max_length=40,
        null=False,
        blank=True,
        default="No Title Provided",
        verbose_name="Post Title",
    )
    body = models.TextField(
        null=False, blank=True, default="No Content Provided", verbose_name="Post Body"
    )
    author = models.ForeignKey(
        UserModel,
        null=False,
        blank=True,
        related_name="post",
        on_delete=models.CASCADE,
    )
    last_updated = models.DateTimeField(
        null=False,
        blank=True,
        auto_now=True,
        editable=False,
        verbose_name="date the post was last updated",
    )
    pic = models.ImageField(
        upload_to="images/", null=True, blank=True, verbose_name="Post Image"
    )

    class Meta:
        ordering = ["-last_updated"]
