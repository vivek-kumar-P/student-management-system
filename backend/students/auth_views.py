from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


def get_role(user):
    if user.is_superuser:
        return "admin"
    if user.groups.filter(name="teacher").exists():
        return "teacher"
    return "student"


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "role": get_role(user),
            }
        )