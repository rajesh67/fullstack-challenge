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

    ShoppingCart,
    Customer,
    Audit,
    Order,
    OrderDetail,
    Review

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
    attributevalue = AttributeValueSerializer(read_only=True)
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
    
    def update(self, instance, validated_data):
        product_data = validated_data.pop('product')
        instance.attributes = validated_data.get("attributes", instance.attributes)
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.save()

        # cart, created = ShoppingCart.objects.get_or_create(product=product, **validated_data)
        return instance


#Customer's serializer

class CustomerSerializer(serializers.ModelSerializer):
    # shipping_region = ShippingRegionSerializer()
    # user  = UserSerializer()
    class Meta:
        model = Customer
        fields = (
                    'id', "user", "address_1", "address_2", 
                    "city", "region", "postal_code", "country", 
                    "shipping_region", "day_phone", "eve_phone", "mob_phone"
                )
    
    def create(self, validated_data):
        # shipping_region = validated_data.pop('shipping_region')
        # user = validated_data.get('user', instance.user)
        # userModel = User.objects.get(username=user)
        
        customer, created = Customer.objects.get_or_create(**validated_data)

        return customer
    
    def update(self, instance, validated_data):
        shipping_region = validated_data.pop('shipping_region')
        user = validated_data.pop('user')

        instance.address_1 = validated_data.get('address_1', instance.address_1)
        instance.address_2 = validated_data.get('address_2', instance.address_2)
        instance.city  = validated_data.get('city', instance.city)
        instance.region = validated_data.get('region', instance.region)
        instance.postal_code = validated_data.get('postal_code', instance.postal_code)
        instance.country = validated_data.get('country', instance.country)
        instance.day_phone = validated_data.get('day_phone', instance.day_phone)
        instance.eve_phone = validated_data('eve_phone', instance.eve_phone)
        instance.mob_phone = validated_data('mob_phone', instance.mob_phone)
        instance.shipping_region, created = ShippingRegion.objects.get_or_create(name=shipping_region)
        instance.user, created = User.objects.get_or_create(username=user["username"])

        return instance

#Order Serializer, Order details serializer

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id", "total_amount", "created_on", "shipped_on",
            "status", "comments", "customer", "auth_code", "reference",
            "shipping", "tax"
        )

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = (
            "id", "product", "attributes", "product_name",
            "quantity", "unit_cost"
        )

#Audit serializer
class AuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audit
        fields = (
            "id", "order", "created_on", "message", "code"
        )

#Review serializer
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "id", "customer", "product", "review", "rating", "created_on"
        )