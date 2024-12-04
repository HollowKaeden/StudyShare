from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view
from .models import File
from .serializers import FileSerializer


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class UploadFileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, subject_id):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file provided"}, status=400)

        file_instance = File.objects.create(
            name=file.name,
            subject_id=subject_id,
            path=file,
            uploader=request.user
        )

        # Сериализуем и возвращаем ответ
        serializer = FileSerializer(file_instance)
        return Response(serializer.data, status=201)


@api_view(['GET'])
def get_files(request, subject_id):
    if request.user.role == 'student':
        # Студенту возвращаем файлы преподавателя
        files = File.objects.filter(subject_id=subject_id, uploader__role='teacher')
    elif request.user.role == 'teacher':
        # Преподавателю возвращаем все файлы студентов
        files = File.objects.filter(subject_id=subject_id, uploader__role='student')
    else:
        return Response({'detail': 'Доступ запрещен.'}, status=403)

    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_student_files(request, subject_id):
    if request.user.role != 'teacher':
        return Response({'detail': 'Доступ запрещен.'}, status=403)

    files = File.objects.filter(subject_id=subject_id,
                                uploader__role='student')
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_teacher_files(request, subject_id):
    files = File.objects.filter(subject_id=subject_id,
                                uploader__role='teacher')
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)
