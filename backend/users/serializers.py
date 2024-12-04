from rest_framework import serializers
from .models import Group, User, Subject, UserSubject
from django.contrib.auth.hashers import make_password


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'role', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    group = GroupSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email',
                  'role', 'group', 'created_at']

    def create(self, validated_data):
        password = validated_data.pop('password', None)

        if password:
            validated_data['password'] = make_password(password)

        user = super().create(validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            validated_data['password'] = make_password(password)

        return super().update(instance, validated_data)


class SubjectSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)

    class Meta:
        model = Subject
        fields = ['id', 'name', 'teacher']


class UserSubjectSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = UserSubject
        fields = ['user', 'subject']
