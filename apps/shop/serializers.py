from rest_framework import serializers
from django.contrib.auth.models import User

from apps.shop.models import (
    Department,
    Category,
    Product,
    ProductCategory,
    Attribute,
    AttributeValue,
    ProductAttribute,
    ShippingRegion,
    Shipping,
    Tax,

    ShoppingCart

)
class UserSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(style = {'input_type':'password'})
    # password2 = serializers.CharField(style = {'input_type':'password'})
    class Meta:
        model = User
        fields = ('id', 'username','first_name', 'last_name', 'password',  'email')
        write_only_fields = ('password',)

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("id", "name", "description")

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name","description","department")

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", 
                    "name", 
                    "description", 
                    "price", 
                    "discounted_price", 
                    "image", 
                    "image_2", 
                    "thumbnail",
                    "display"
                )

class ProductCategorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = ProductCategory
        fields = (
            "id",
            "category",
            "product"
        )

class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ("id", "name")

class AttributeValueSerializer(serializers.ModelSerializer):
    attribute = AttributeSerializer()
    class Meta:
        model = AttributeValue
        fields = ("id", "value", "attribute")

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ("id", "product", "attributevalue")

class ShippingRegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingRegion
        fields = ("id", "shipping_region")

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = ("id", "shipping_type", "shipping_cost", "shipping_region")

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = ("id", "tax_type", "tax_percentage")

class ShoppingCartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = ShoppingCart
        fields = ("id", "attributes", "quantity", "buy_now", "added_on","product")
    
    def create(self, validated_data):
        product_data = validated_data.pop('product')
        product = Product.objects.get(name=product_data["name"])

        cart, created = ShoppingCart.objects.get_or_create(product=product, **validated_data)
        return cart