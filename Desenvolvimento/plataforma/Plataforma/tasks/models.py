from django.db import models
from accounts.models import MyUser
from django.core.validators import MinValueValidator

# Create your models here.


class Task(models.Model):
    nome = models.CharField("Nome", max_length=45)
    descricao = models.CharField("Descrição Breve", max_length=500)
    data_inicio = models.DateField(auto_now_add=True)
    data_fim = models.DateField(
        "Data Fim", auto_now=False, auto_now_add=False, null=True)
    preco = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    owner = models.ForeignKey(
        MyUser, related_name='tasks', on_delete=models.CASCADE, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.nome


class Bid(models.Model):
    proposta = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    data_proposta = models.DateField(auto_now_add=True)
    bidder = models.ForeignKey(MyUser, related_name='bids', on_delete=models.CASCADE, null=True)
    task = models.ForeignKey(Task, related_name='bids',on_delete=models.CASCADE)
    