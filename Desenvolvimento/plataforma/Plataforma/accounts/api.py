from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import MyUserSerializer, RegBidderSerializer, RegProponentSerializer, LoginBidderSerializer, LoginProponentSerializer,ReviewSerializer
from knox.auth import TokenAuthentication
from tasks.serializers import TaskSerializer
from django.core import serializers
from tasks.models import Task
from accounts.models import Bidder,Proponent,MyUser

class RegisterBidderAPI(generics.GenericAPIView):
    serializer_class = RegBidderSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": RegBidderSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user.user)[1]
        })


class RegisterProponentAPI(generics.GenericAPIView):
    serializer_class = RegProponentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": RegProponentSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user.user)[1]
        })


class LoginBidderAPI(generics.GenericAPIView):
    permissions_classes = [permissions.AllowAny, ]

    serializer_class = LoginBidderSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        b=Bidder.objects.get(user=user)
        return Response({
            "user": RegBidderSerializer(b, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginProponentAPI(generics.GenericAPIView):
    permissions_classes = [permissions.AllowAny, ]

    serializer_class = LoginProponentSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        p=Proponent.objects.get(user=user)
        return Response({
            "user": RegProponentSerializer(p, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class ListBiddersAPI(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = RegBidderSerializer

    def get_queryset(self):
        if self.request.user.is_bidder:
            return Bidder.objects.exclude(user_id=self.request.user.id)


class UpdateBidderAPI(generics.RetrieveUpdateAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]

    serializer_class = RegBidderSerializer

    def update(self,request,*args,**kwargs):
        serializer = self.serializer_class(request.user,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response(
             RegBidderSerializer(user, context=self.get_serializer_context()).data
                    )

class UpdateProponentAPI(generics.RetrieveUpdateAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]

    serializer_class = RegProponentSerializer

    def update(self,request,*args,**kwargs):
        serializer = self.serializer_class(request.user,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(RegProponentSerializer(user, context=self.get_serializer_context()).data)
            
class UserAPI(generics.RetrieveAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]
    def get_serializer_class(self):
        if (self.request.user.is_bidder):
            return RegBidderSerializer
        else:
            return RegProponentSerializer

    def get_object(self):
        if(self.request.user.is_bidder):
            u=Bidder.objects.get(user=self.request.user)
        else:
            u=Proponent.objects.get(user=self.request.user)
        return u

class ReviewAPI(generics.ListCreateAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = ReviewSerializer
    def post(self, request, *args, **kwargs):
        if(not request.user.is_bidder):
            id=request.data['task_id']
            task=Task.objects.get(id=id).ongoing.all()
            task=task[0]
            user_rec=task.worker
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            review = serializer.save(user_faz=self.request.user,user_rec=user_rec)
            return Response({
                "review": ReviewSerializer(review, context=self.get_serializer_context()).data,
                })
        else:
            id=request.data['task_id']
            task=Task.objects.get(id=id)
            user_rec = task.owner
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            review = serializer.save(user_faz=self.request.user,user_rec=user_rec)
            return Response({
                "review": ReviewSerializer(review, context=self.get_serializer_context()).data,
                })

    def get_queryset(self):
        email=self.request.query_params['email']
        if(self.request.user.email==email):
            return self.request.user.reviews_rec.all()
        else:
            u=MyUser.objects.get(email=email)
            return u.reviews_rec.all()


