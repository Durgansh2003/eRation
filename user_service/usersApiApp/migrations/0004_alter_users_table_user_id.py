# Generated by Django 5.0.1 on 2024-02-08 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersApiApp', '0003_items_table_alter_feedback_table_customer_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users_table',
            name='user_id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
    ]
