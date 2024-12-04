from rest_framework import serializers
from users.serializers import UserSerializer, SubjectSerializer
from .models import File


class FileSerializer(serializers.ModelSerializer):
    uploader = UserSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = File
        fields = ['id', 'name', 'path', 'uploader',
                  'subject', 'upload_date']
