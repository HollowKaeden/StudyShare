from django.contrib import admin
from .models import Group, User, Subject, UserSubject


admin.site.register(Group)
admin.site.register(User)
admin.site.register(Subject)
admin.site.register(UserSubject)
