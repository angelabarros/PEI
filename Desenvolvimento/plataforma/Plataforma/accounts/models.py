from django.db import models
from djongo.models import ListField
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
from cuser.models import AbstractCUser

class MyUser(AbstractCUser):
	about_me = models.CharField(max_length=500)
	link = models.URLField(max_length=128,blank=True)
	photo = models.ImageField(default="../img/profile.jpg")
	is_bidder = models.BooleanField(default=False)

	def __str__(self):
		return  self.email	


class Bidder(models.Model):
    user=models.OneToOneField(MyUser,on_delete=models.CASCADE)
    aluno=models.BooleanField(default=False)
    compt= ListField()
    
class Proponent(models.Model):
    user=models.OneToOneField(MyUser,on_delete=models.CASCADE)
    company=models.CharField(max_length=25)

class Review(models.Model):
	user_rec = models.ForeignKey(
        MyUser, related_name='reviews_rec', on_delete=models.CASCADE, null=True)
	user_faz = models.ForeignKey(
        MyUser, related_name='reviews_feit', on_delete=models.CASCADE, null=True)
	crit_1 = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(5)])
	crit_2 = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(5)])
	crit_3 = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(5)])
	comentario = models.CharField(max_length=1000)

