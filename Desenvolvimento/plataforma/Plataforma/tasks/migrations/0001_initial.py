# Generated by Django 2.2.7 on 2019-12-30 15:32

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=45, verbose_name='Nome')),
                ('descricao', models.CharField(max_length=500, verbose_name='Descrição Breve')),
                ('data_inicio', models.DateField(auto_now_add=True)),
                ('data_fim', models.DateField(null=True, verbose_name='Data Fim')),
                ('preco', models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(0)])),
                ('is_active', models.BooleanField(default=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Bid',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('proposta', models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(0)])),
                ('data_proposta', models.DateField(auto_now_add=True)),
                ('bidder', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bids', to=settings.AUTH_USER_MODEL)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bids', to='tasks.Task')),
            ],
        ),
    ]
