from rest_framework import serializers
from .models import MyUser,Proponent, Bidder,Review
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
class MyUserSerializer(serializers.ModelSerializer):
	class Meta:
		model=MyUser
		fields = ('id','email','first_name','last_name','password', 'is_bidder','about_me','link','photo',)
		extra_kwargs = {'password' : {'write_only' : True} }


class RegBidderSerializer(serializers.ModelSerializer):
	user = MyUserSerializer()
	class Meta:
		model=Bidder
		fields = ('user','aluno','compt',)

	def create(self, validated_data):
		user_data = validated_data.pop('user')
		user = MyUser.objects.create(**user_data,is_bidder=True)
		aluno_data = validated_data.pop('aluno')
		compt=validated_data.pop('compt')
		b=Bidder.objects.create(user=user,aluno=aluno_data,compt=compt)
		return b

	def update(self,instance,validated_data):
		for(key,value) in validated_data.pop('user').items():
			setattr(instance,key,value)

		instance.save()

		b= Bidder.objects.get(user_id=instance.id)
		for(key,value) in validated_data.items():
			setattr(b,key,value)
		b.save()
		return b



class RegProponentSerializer(serializers.ModelSerializer):
	user = MyUserSerializer()
	class Meta:
		model=Proponent
		fields = ('user','company',)
	def create(self, validated_data):
		user_data = validated_data.pop('user')
		user = MyUser.objects.create(**user_data)
		company=validated_data.pop('company')
		p=Proponent.objects.create(user=user,company=company)
		return p

	def update(self,instance,validated_data):
		for(key,value) in validated_data.pop('user').items():
			setattr(instance,key,value)

		instance.save()

		p= Proponent.objects.get(user_id=instance.id)
		for(key,value) in validated_data.items():
			setattr(p,key,value)
		p.save()
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
				if user_obj.password==password and not user_obj.is_bidder:
					return user_obj
				else:
					raise ValidationError("Credenciais erradas")
			else:
				raise ValidationError("Credenciais erradas")
		else:
			raise ValidationError("Credenciais erradas")


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

'''
class ListBidder(serializers.Serializer):
	user=MyUserSerializer

	class Meta:
		model =Bidder
		fields = ('user','aluno')
'''
