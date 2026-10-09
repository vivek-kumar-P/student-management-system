from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from django.db.models import ProtectedError

from .models import Student, Department, Course, Enrollment
from .serializers import (
    StudentSerializer,
    DepartmentSerializer,
    CourseSerializer,
    EnrollmentSerializer,
)
from .permissions import RolePermission


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by("id")
    serializer_class = StudentSerializer
    permission_classes = [RolePermission]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "email"]

    def get_queryset(self):
        queryset = super().get_queryset()
        department = self.request.query_params.get("department")
        if department:
            queryset = queryset.filter(department__iexact=department)
        return queryset


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all().order_by("name")
    serializer_class = DepartmentSerializer
    permission_classes = [RolePermission]

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"detail": "Cannot delete a department that still has courses."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.select_related("department").order_by("code")
    serializer_class = CourseSerializer
    permission_classes = [RolePermission]
    filter_backends = [filters.SearchFilter]
    search_fields = ["code", "title"]

    def get_queryset(self):
        queryset = super().get_queryset()
        department = self.request.query_params.get("department")
        if department:
            queryset = queryset.filter(department_id=department)
        return queryset


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.select_related("student", "course").order_by("-id")
    serializer_class = EnrollmentSerializer
    permission_classes = [RolePermission]

    def get_queryset(self):
        queryset = super().get_queryset()
        student = self.request.query_params.get("student")
        course = self.request.query_params.get("course")
        if student:
            queryset = queryset.filter(student_id=student)
        if course:
            queryset = queryset.filter(course_id=course)
        return queryset