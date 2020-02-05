from rest_framework import serializers
from .models import Task,Bid,OnGoing,Chat
from accounts.serializers import MyUserSerializer, RegProponentSerializer, RegBidderSerializer
from accounts.models import Proponent, Bidder

class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField('get_owner')
    # owner_email = serializers.SerializerMethodField('get_owner_email')
    worker_name = serializers.SerializerMethodField('get_worker_name')
    worker_about = serializers.SerializerMethodField('get_worker_about')
    worker_compt = serializers.SerializerMethodField('get_worker_compt')


    def get_worker_name(self, obj):
        task_id=obj.id
        task=Task.objects.get(id=task_id).ongoing.all()
        if(task.count()):
            task=task[0]
            return task.worker.first_name + ' '+  task.worker.last_name
        else:
            return 'null'

    def get_worker_about(self, obj):
        task_id=obj.id
        task=Task.objects.get(id=task_id).ongoing.all()
        if(task.count()):
            task=task[0]
            return task.worker.about_me
        else:
            return 'null'

    def get_worker_compt(self, obj):
        task_id=obj.id
        task=Task.objects.get(id=task_id).ongoing.all()
        
        if(task.count()):
            task=task[0]
            b=Bidder.objects.get(user=task.worker)  
            return b.compt  
        else:
            return 'null'


    def get_owner(self, obj):
        user = Proponent.objects.get(user=obj.owner)
        user = RegProponentSerializer(user)
        return user.data

    # def get_owner_email(self, obj):
    #     return obj.owner.email

 

    class Meta:
        model = Task
        fields = ('id', 'nome', 'descricao_breve', 'data_inicio', 'data_fim',
                  'preco_min','preco_max','owner' ,'especificacao','compt','onGoing', 'worker_name', 'worker_about','worker_compt')

class BidSerializer(serializers.ModelSerializer):
    bidder_nome = serializers.SerializerMethodField('get_bidder_name')
    task_name = serializers.SerializerMethodField('get_task_name')
    bidder_about=serializers.SerializerMethodField('get_bidder_about')
    bidder_id=serializers.SerializerMethodField('get_bidder_id')
    bidder_compt=serializers.SerializerMethodField('get_bidder_compt')
    bidder_email=serializers.SerializerMethodField('get_bidder_email')


    def get_bidder_id(self,obj):
        return obj.bidder.id
    def get_bidder_about(self,obj):
        return obj.bidder.about_me
    def get_task_name(self,obj):
        return obj.task.nome

    def get_bidder_name(self,obj):
        return obj.bidder.first_name + ' ' + obj.bidder.last_name
    def get_bidder_compt(self,obj):
        b=Bidder.objects.get(user=obj.bidder)
        return b.compt
    def get_bidder_email(self,obj):
        return obj.bidder.email

    class Meta:
        model = Bid
        fields = ('id','proposta','data_proposta','bidder_nome','task','task_name','bidder_about','bidder_id','bidder_compt', 'bidder_email')

class OnGoingSerializer(serializers.ModelSerializer):
    worker_name = serializers.SerializerMethodField('get_worker_name')
    worker_email = serializers.SerializerMethodField('get_worker_email')
    

    def get_worker_name(self, obj):
       return obj.worker.first_name + ' ' + obj.worker.last_name

    def get_worker_email(self, obj):
        return obj.worker.email

    class Meta:
        model= OnGoing
        fields = ('id','worker_name','worker_email','task',)
            
        
class ChatSerializer(serializers.ModelSerializer):
    
    worker_name = serializers.SerializerMethodField('get_worker_name')

    def get_worker_name(self, obj):
        task_id=obj.about_task
        task=Task.objects.get(id=task_id.id).ongoing.all()
        task=task[0]
        return task.worker.first_name + ' '+  task.worker.last_name



    class Meta:
        model = Chat
        fields = ('id','time_stamp','user_rec','user_manda','about_task','mensagem','worker_name')
