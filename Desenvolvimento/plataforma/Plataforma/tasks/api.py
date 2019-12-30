from tasks.models import Task, Bid
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer, BidSerializer
from rest_framework import generics, permissions
from django.core.exceptions import ValidationError


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = TaskSerializer

    def get_queryset(self):
        if not self.request.user.is_bidder:
            return self.request.user.tasks.all()
        else:
            return Task.objects.all()

    def perform_create(self, serializer):
        if not self.request.user.is_bidder:
            serializer.save(owner=self.request.user)
        else:
            raise ValidationError("Não é permitido")

    def destroy(self,request,*args,**kwargs):
        if self.request.user.id == self.get_object().owner_id:
            o=self.get_object()
            self.perform_destroy(o)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return ValidationError('Não autorizado')


class BidViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = BidSerializer

    def get_queryset(self,id):
        t = Task.objects.get(id=self.request.query_params['task'])
        bids = t.bids.all()

        return bids

    def perform_create(self, serializer):
        id_task = self.request.data['task']
        t = Task.objects.get(id=id_task)

        if self.request.user.is_bidder and t.is_active:
            for i in self.request.user.bids.all():
                if(i.task_id == id_task):
                    raise ValidationError("Não é permitido")

            serializer.save(bidder=self.request.user)
        else:
            raise ValidationError("Não é permitido")

# mostra as bids a todas as tarefas de um bidder


class BidderAPI(viewsets.ModelViewSet):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = BidSerializer

    def get_queryset(self):
        if self.request.user.is_bidder:
            return self.request.user.bids.all()
