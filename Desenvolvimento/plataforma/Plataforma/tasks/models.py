from django.db import models
from accounts.models import MyUser
from django.core.validators import MinValueValidator
from djongo.models import ListField

# Create your models here.


class Task(models.Model):
    nome = models.CharField("Nome", max_length=45)
    descricao_breve = models.CharField("Descrição Breve", max_length=1000)
    especificacao = models.CharField( max_length=100000)
    data_inicio = models.DateField(auto_now_add=True)
    data_fim = models.DateField(
        "Data Fim", auto_now=False, auto_now_add=False, null=True)
    preco_min = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    preco_max = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    owner = models.ForeignKey(
        MyUser, related_name='tasks', on_delete=models.CASCADE, null=True)
    compt=ListField()
    onGoing = models.IntegerField(default=0)
 


    def __str__(self):
        return self.nome


class Bid(models.Model):
    proposta = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    data_proposta = models.DateField(auto_now_add=True)
    bidder = models.ForeignKey(MyUser, related_name='bids', on_delete=models.CASCADE, null=True)
    task = models.ForeignKey(Task, related_name='bids',on_delete=models.CASCADE)

class OnGoing(models.Model):
    worker = models.ForeignKey(
             MyUser, related_name='worker', on_delete=models.CASCADE, null=True)
    task = models.ForeignKey(Task, related_name='ongoing',on_delete=models.CASCADE)






class Chat(models.Model):
    user_rec = models.ForeignKey(
        MyUser, related_name='chat_rec', on_delete=models.CASCADE, null=True)
    user_manda = models.ForeignKey(
        MyUser, related_name='chat_manda', on_delete=models.CASCADE, null=True)

    about_task = models.ForeignKey(
        Task, related_name='task', on_delete=models.CASCADE, null=True)

    mensagem = models.CharField(max_length=1000)

    time_stamp = models.DateTimeField(auto_now_add=True)
