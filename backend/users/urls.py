from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (GroupViewSet,
                    RegisterView,
                    UserViewSet,
                    current_user,
                    SubjectViewSet,
                    SubjectListView,
                    UserSubjectViewSet)


router = DefaultRouter()
router.register(r'groups', GroupViewSet)
router.register(r'users', UserViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'user-subjects', UserSubjectViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/user_subjects/', SubjectListView.as_view(), name='subjects-list'),
    path('api/current_user/', current_user, name='current_user'),
    path('api/register/', RegisterView.as_view(), name='register')
]
