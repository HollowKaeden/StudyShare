from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Group, Subject, UserSubject
from .serializers import (RegisterSerializer,
                          UserSerializer,
                          GroupSerializer,
                          SubjectSerializer,
                          UserSubjectSerializer)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class RegisterView(APIView):
    authentication_classes = []  # Отключаем JWT и другие аутентификации
    permission_classes = []      # Отключаем проверку прав

    def post(self, request):
        request.data['role'] = 'student'
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Пользователь успешно создан!", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET'])
def current_user(request):
    if request.user.is_authenticated:
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "role": request.user.role,
        })
    else:
        return Response({"detail": "Authentication required"}, status=401)


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class SubjectListView(APIView):
    def get(self, request):
        user = request.user
        subjects = Subject.objects.filter(usersubject__user=user)  # Пользователь должен быть связан с предметом
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)


class UserSubjectViewSet(viewsets.ModelViewSet):
    queryset = UserSubject.objects.all()
    serializer_class = UserSubjectSerializer
