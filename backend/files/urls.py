from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (FileViewSet, UploadFileView, get_files,
                    get_student_files, get_teacher_files)


router = DefaultRouter()
router.register(r'files', FileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload_subject/<int:subject_id>',
         UploadFileView.as_view(), name='upload-file'),
    path('subject/<int:subject_id>/', get_files),
    path('subject/students/<int:subject_id>', get_student_files),
    path('subject/teachers/<int:subject_id>', get_teacher_files),
]
