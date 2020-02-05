from tasks.models import Task, Bid,Chat
from accounts.models import MyUser
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer, BidSerializer,OnGoingSerializer,ChatSerializer
from rest_framework import generics, permissions
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from rest_framework.response import Response


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = TaskSerializer

    def get_queryset(self):
        if not self.request.user.is_bidder:
            return self.request.user.tasks.filter(onGoing=0)
        else:
            return Task.objects.filter(onGoing=0)

    def perform_create(self, serializer):
        if not self.request.user.is_bidder:
            serializer.save(owner=self.request.user)
        else:
            raise ValidationError("Não é permitido")

    def destroy(self, request, *args, **kwargs):
        if self.request.user.id == self.get_object().owner_id:
            o = self.get_object()
            self.perform_destroy(o)
            return HttpResponse(status=204)
        else:
            return ValidationError('Não autorizado')


class BidViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = BidSerializer

    def get_queryset(self):
        t = Task.objects.get(id=self.request.query_params['task'])
        bids = t.bids.all()

        return bids

    def perform_create(self, serializer):
        id_task = self.request.data['task']
        t = Task.objects.get(id=id_task)

        if self.request.user.is_bidder and t.onGoing==0:
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


class OnGoingAPI(viewsets.ModelViewSet):
    permissions_classes=[permissions.IsAuthenticated,]
    def get_serializer_class(self):
        if self.request.method=="POST":
            return OnGoingSerializer
        elif self.request.method == "GET":
            return TaskSerializer
        elif self.request.method == "PUT":
            return TaskSerializer

    def perform_create(self,serializer):
        if not self.request.user.is_bidder:
            test=Task.objects.get(id=self.request.data['task'])
            test.onGoing=1
            test.save()
            serializer.save(worker=MyUser.objects.get(id=self.request.data['worker']),task=Task.objects.get(id=self.request.data['task']))

    def get_queryset(self):
        if not self.request.user.is_bidder:
            return self.request.user.tasks.filter(onGoing=1) | self.request.user.tasks.filter(onGoing=2)
        else :
            query=Task.objects.none()
            for i in self.request.user.worker.all():
                query|=Task.objects.filter(id=i.task.id,onGoing=1)
                query|=Task.objects.filter(id=i.task.id,onGoing=2)
                query|=Task.objects.filter(id=i.task.id,onGoing=3)
            return query

class UpdateTask(generics.RetrieveUpdateAPIView):
    permissions_classes=[permissions.IsAuthenticated,]
    serializer_class=TaskSerializer 
    def update(self, request, *args, **kwargs):
            id = self.request.data['task']
            instance = Task.objects.get(id=id)
            serializer = self.serializer_class(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)






class ChatAPI(generics.ListCreateAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = ChatSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task_id = request.data['about_task']
        id = request.data['user_manda']
        u = MyUser.objects.get(id=id)
        task=Task.objects.get(id=task_id)

        if(u.is_bidder):
            user_rec=task.owner
        else:
            tasko=Task.objects.get(id=task_id).ongoing.all()
            taskoo=tasko[0]
            user_rec=taskoo.worker


       


        chat = serializer.save(user_manda=u,user_rec=user_rec,about_task=task)
        return Response(ChatSerializer(chat, context=self.get_serializer_context()).data,
                )

    def get_queryset(self):
        id=self.request.query_params['task_id']
        task=Task.objects.get(id=id)

        if(not self.request.user.is_bidder):
            tasko=Task.objects.get(id=id).ongoing.all()
            taskoo=tasko[0]
            user_rec=taskoo.worker

            query_set_1 = Chat.objects.filter(user_manda=self.request.user, user_rec=user_rec,about_task=task)
            query_set_2 = Chat.objects.filter(user_manda=user_rec, user_rec=self.request.user,about_task=task)

        else:    
            user_rec = task.owner
            query_set_1 = Chat.objects.filter(user_manda=self.request.user, user_rec=user_rec,about_task=task)
            query_set_2 = Chat.objects.filter(user_manda=user_rec, user_rec=self.request.user,about_task=task)
        

        return (query_set_1 | query_set_2).order_by('time_stamp')