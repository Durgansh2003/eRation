# Generated by Django 5.0.1 on 2024-02-14 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventoryApiApp', '0003_orders_table_completion_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback_table',
            name='rating',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='orders_table',
            name='completion_date',
            field=models.DateField(blank=True, default=None, null=True),
        ),
    ]