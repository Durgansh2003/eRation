# Generated by Django 5.0.1 on 2024-02-12 06:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordersApiApp', '0003_alter_users_table_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders_table',
            name='completion_date',
            field=models.DateField(blank=True, default=None),
        ),
        migrations.AddField(
            model_name='orders_table',
            name='creation_date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
