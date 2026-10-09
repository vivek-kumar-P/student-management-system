from rest_framework import serializers
from .models import Student, Department, Course, Enrollment


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    course_count = serializers.IntegerField(source="courses.count", read_only=True)

    class Meta:
        model = Department
        fields = ["id", "name", "course_count"]


class CourseSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Course
        fields = ["id", "code", "title", "credits", "department", "department_name"]


class EnrollmentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="student.name", read_only=True)
    course_code = serializers.CharField(source="course.code", read_only=True)
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = Enrollment
        fields = [
            "id", "student", "student_name",
            "course", "course_code", "course_title",
            "enrolled_on",
        ]
        read_only_fields = ["enrolled_on"]