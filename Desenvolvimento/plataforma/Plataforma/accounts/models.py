from django.db import models

# Create your models here.
from cuser.models import AbstractCUser

class MyUser(AbstractCUser):
	is_bidder = models.BooleanField(default=False)
	is_proponent = models.BooleanField(default=False)

	def __str__(self):
		return  self.email	


class Bidder(models.Model):
    user=models.OneToOneField(MyUser,on_delete=models.CASCADE)
    aluno=models.BooleanField(default=False)

class Proponent(models.Model):
    user=models.OneToOneField(MyUser,on_delete=models.CASCADE)

