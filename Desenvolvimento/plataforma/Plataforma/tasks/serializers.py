from rest_framework import serializers
from .models import Task


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
