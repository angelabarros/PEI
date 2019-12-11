from django.contrib import admin
from .models import Proponent, Bidder, MyUser

# Register your models here.
admin.site.register(Proponent)
admin.site.register(Bidder)
admin.site.register(MyUser)