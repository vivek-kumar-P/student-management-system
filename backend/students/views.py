from rest_framework import viewsets, filters
from .models import Student
from .serializers import StudentSerializer
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