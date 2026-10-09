from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    StudentViewSet,
    DepartmentViewSet,
    CourseViewSet,
    EnrollmentViewSet,
)
from .auth_views import MeView

router = DefaultRouter()
router.register("students", StudentViewSet)
router.register("departments", DepartmentViewSet)
router.register("courses", CourseViewSet)
router.register("enrollments", EnrollmentViewSet)

urlpatterns = [
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path("auth/me/", MeView.as_view()),
] + router.urls