from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField()
    department = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    code = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=150)
    credits = models.PositiveSmallIntegerField(default=3)
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name="courses"
    )

    def __str__(self):
        return f"{self.code} - {self.title}"


class Enrollment(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="enrollments"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="enrollments"
    )
    enrolled_on = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "course")

    def __str__(self):
        return f"{self.student} -> {self.course}"