from tasks.models import Task 
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer
from rest_framework import generics, permissions
from django.core.exceptions import ValidationError

class TaskViewSet(viewsets.ModelViewSet):
	permission_classes = [permissions.IsAuthenticated,]
	serializer_class = TaskSerializer

	def get_queryset(self):
		if self.request.user.is_proponent:
			return self.request.user.tasks.all()
		else:
			return Task.objects.all()

	def perform_create(self,serializer):
		if self.request.user.is_proponent:
			serializer.save(owner=self.request.user)
		else: 
			raise ValidationError("Não é permitido")