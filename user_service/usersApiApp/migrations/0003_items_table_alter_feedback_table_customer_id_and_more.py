# Generated by Django 5.0.1 on 2024-02-08 03:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersApiApp', '0002_alter_feedback_table_customer_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='items_table',
            fields=[
                ('item_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('price', models.FloatField()),
            ],
            options={
                'db_table': 'items_table',
            },
        ),
        migrations.AlterField(
            model_name='feedback_table',
            name='customer_id',
            field=models.ForeignKey(db_column='customer_id', on_delete=django.db.models.deletion.CASCADE, related_name='customer_feedback', to='usersApiApp.users_table'),
        ),
        migrations.AlterField(
            model_name='feedback_table',
            name='shopkeeper_id',
            field=models.ForeignKey(db_column='shopkeeper_id', on_delete=django.db.models.deletion.CASCADE, related_name='shopkeeper_feedback', to='usersApiApp.users_table'),
        ),
        migrations.CreateModel(
            name='inventory_table',
            fields=[
                ('inventory_id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField()),
                ('shopkeeper_id', models.ForeignKey(db_column='shopkeeper_id', on_delete=django.db.models.deletion.CASCADE, to='usersApiApp.users_table')),
                ('item_id', models.ForeignKey(db_column='item_id', on_delete=django.db.models.deletion.CASCADE, to='usersApiApp.items_table')),
            ],
            options={
                'db_table': 'inventory_table',
            },
        ),
        migrations.CreateModel(
            name='orders_table',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('total_amount', models.FloatField()),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Completed', 'Completed')], max_length=100)),
                ('customer_id', models.ForeignKey(db_column='customer_id', on_delete=django.db.models.deletion.CASCADE, related_name='customer_orders', to='usersApiApp.users_table')),
                ('shopkeeper_id', models.ForeignKey(db_column='shopkeeper_id', on_delete=django.db.models.deletion.CASCADE, related_name='shopkeeper_orders', to='usersApiApp.users_table')),
            ],
            options={
                'db_table': 'orders_table',
            },
        ),
        migrations.CreateModel(
            name='transactions_table',
            fields=[
                ('transaction_id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField()),
                ('item_id', models.ForeignKey(db_column='item_id', on_delete=django.db.models.deletion.CASCADE, to='usersApiApp.items_table')),
                ('order_id', models.ForeignKey(db_column='order_id', on_delete=django.db.models.deletion.CASCADE, to='usersApiApp.orders_table')),
            ],
            options={
                'db_table': 'transactions_table',
            },
        ),
    ]
