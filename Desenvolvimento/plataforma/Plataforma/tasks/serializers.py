from rest_framework import serializers
from .models import Task,Bid


class TaskSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField('get_owner_name')
    owner_email = serializers.SerializerMethodField('get_owner_email')

    def get_owner_name(self, obj):
        return obj.owner.first_name + ' ' + obj.owner.last_name

    def get_owner_email(self, obj):
        return obj.owner.email

    class Meta:
        model = Task
        fields = ('id', 'nome', 'descricao', 'data_inicio', 'data_fim',
                  'preco', 'owner_name', 'owner_email',)

class BidSerializer(serializers.ModelSerializer):
    bidder_email = serializers.SerializerMethodField('get_bidder_email')
    task_name = serializers.SerializerMethodField('get_task_name')

    def get_task_name(self,obj):
        return obj.task.nome

    def get_bidder_email(self,obj):
        return obj.bidder.email

    class Meta:
        model = Bid
        fields = ('id','proposta','data_proposta','bidder_email','task','task_name',)
