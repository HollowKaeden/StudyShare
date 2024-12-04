from django.db import models
from users.models import User, Subject


class File(models.Model):
    name = models.CharField(max_length=255)
    path = models.FileField(upload_to='uploads/')
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
