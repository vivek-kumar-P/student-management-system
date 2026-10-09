from rest_framework.permissions import BasePermission, SAFE_METHODS
from .auth_views import get_role


class RolePermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        role = get_role(user)

        if request.method in SAFE_METHODS:
            return True
        if request.method == "DELETE":
            return role == "admin"
        return role in ("admin", "teacher")