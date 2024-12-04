from django.contrib.auth.models import AbstractUser
from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    group = models.ForeignKey(Group, on_delete=models.SET_NULL,
                              null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class Subject(models.Model):
    name = models.CharField(max_length=150)
    teacher = models.ForeignKey(User,
                                on_delete=models.SET_NULL,
                                null=True,
                                related_name='subjects')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class UserSubject(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'subject')

    def __str__(self):
        return f'{self.user.username} - {self.subject.name}'
