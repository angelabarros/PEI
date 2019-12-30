from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import MyUserSerializer, RegBidderSerializer, RegProponentSerializer, LoginBidderSerializer, LoginProponentSerializer
from knox.auth import TokenAuthentication
from tasks.serializers import TaskSerializer
from django.core import serializers
from tasks.models import Task
from accounts.models import Bidder,Proponent
from rest_framework.mixins import UpdateModelMixin


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

class UpdateBidderAPI(generics.RetrieveUpdateAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]

    serializer_class = RegBidderSerializer

    def update(self,request,*args,**kwargs):
        serializer = self.serializer_class(request.user,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            "user": RegBidderSerializer(user, context=self.get_serializer_context()).data,
                    })



class RegisterProponentAPI(generics.GenericAPIView):
    serializer_class = RegProponentSerializer
    queryset= Proponent.objects.all()
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": RegProponentSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user.user)[1]
        })



class UpdateProponentAPI(generics.RetrieveUpdateAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]

    serializer_class = RegProponentSerializer

    def update(self,request,*args,**kwargs):
        serializer = self.serializer_class(request.user,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": RegProponentSerializer(user, context=self.get_serializer_context()).data,
                    })




class LoginBidderAPI(generics.GenericAPIView):
    permissions_classes = [permissions.AllowAny, ]

    serializer_class = LoginBidderSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        return Response({
            "user": MyUserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginProponentAPI(generics.GenericAPIView):
    permissions_classes = [permissions.AllowAny, ]

    serializer_class = LoginProponentSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        return Response({
            "user": MyUserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class ListBiddersAPI(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = RegBidderSerializer

    def get_queryset(self):
        if self.request.user.is_bidder:
            return Bidder.objects.all()


class UserAPI(generics.RetrieveAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = MyUserSerializer

    def get_object(self):
        return self.request.user

