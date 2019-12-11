from rest_framework import serializers
from .models import MyUser,Proponent, Bidder
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
class MyUserSerializer(serializers.ModelSerializer):
	class Meta:
		model=MyUser
		fields = ('id','email','first_name','last_name','password', 'is_bidder',)
		extra_kwargs = {'password' : {'write_only' : True} }


class RegBidderSerializer(serializers.ModelSerializer):
	user = MyUserSerializer()
	class Meta:
		model=Bidder
		fields = ('user','aluno',)
	def create(self, validated_data):
		user_data = validated_data.pop('user')
		user = MyUser.objects.create(**user_data,is_bidder=True)
		aluno_data = validated_data.pop('aluno')
		b=Bidder.objects.create(user=user,aluno=aluno_data)
		return b

class RegProponentSerializer(serializers.ModelSerializer):
	user = MyUserSerializer()
	class Meta:
		model=Proponent
		fields = ('user',)
	def create(self, validated_data):
		user_data = validated_data.pop('user')
		user = MyUser.objects.create(**user_data,is_proponent=True)
		p=Proponent.objects.create(user=user)
		return p


class LoginBidderSerializer(serializers.Serializer):
	email=serializers.EmailField(label='Email Address')
	password=serializers.CharField(label='Password')
	class Meta:
		model=MyUser
		fields=[
			'email',
			'password',
		]
	def validate(self,data):
		email = data.get('email')
		password = data.get('password')
		user = MyUser.objects.filter(email=email).distinct()
		if user.exists():
			user_obj = user.first()
			if user_obj:
				if user_obj.password==password and user_obj.is_bidder:
					return user_obj
				else:
					raise ValidationError("Credenciais erradas")
			else:
				raise ValidationError("Credenciais erradas")
		else:
			raise ValidationError("Credenciais erradas")



class LoginProponentSerializer(serializers.Serializer):
	email=serializers.EmailField(label='Email Address')
	password=serializers.CharField(label='Password')
	class Meta:
		model=MyUser
		fields=[
			'email',
			'password',
		]
	def validate(self,data):
		email = data.get('email')
		password = data.get('password')
		user = MyUser.objects.filter(email=email).distinct()
		if user.exists():
			user_obj = user.first()
			if user_obj:
				if user_obj.password==password and user_obj.is_proponent:
					return user_obj
				else:
					raise ValidationError("Credenciais erradas")
			else:
				raise ValidationError("Credenciais erradas")
		else:
			raise ValidationError("Credenciais erradas")
'''
class ListBidder(serializers.Serializer):
	user=MyUserSerializer

	class Meta:
		model =Bidder
		fields = ('user','aluno')
'''
