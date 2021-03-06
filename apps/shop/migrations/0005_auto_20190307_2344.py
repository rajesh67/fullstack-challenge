# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-03-07 18:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0004_remove_productattribute_attribute_value'),
    ]

    operations = [
        migrations.AddField(
            model_name='productattribute',
            name='product',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='product_attributes', to='shop.Product'),
        ),
        migrations.AlterField(
            model_name='productattribute',
            name='attribute',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attribute_products', to='shop.Attribute'),
        ),
    ]
