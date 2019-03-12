from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Department(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = 'department'

    def __str__(self):
        return self.name

class Category(models.Model):
    department = models.ForeignKey(Department, related_name="categories_list", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, null=True, blank=True)

    class Meta:
        db_table = 'category'

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    discounted_price = models.DecimalField(default=0.0, max_digits=5, decimal_places=2)
    image = models.CharField(max_length=150, null=True, blank=True)
    image_2 = models.CharField(max_length=150, null=True, blank=True)
    thumbnail = models.CharField(max_length=150, null=True, blank=True)
    display = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'product'

    def __str__(self):
        return self.name

# ProductCategory Relationship
class ProductCategory(models.Model):
    product = models.ForeignKey(Product, related_name="product_category_list", on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name="product_category_list", on_delete=models.CASCADE)

    class Meta:
        db_table = "product_category"

class Attribute(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'attribute'
    
    def __str__(self):
        return self.name

class AttributeValue(models.Model):
    attribute = models.ForeignKey(Attribute, related_name="values_list", on_delete=models.CASCADE)
    value = models.CharField(max_length=100)

    class Meta:
        db_table = "attribute_value"
    
    def __str__(self):
        return self.value

# ProductAttribute Relationship
class ProductAttribute(models.Model):
    attributevalue = models.ForeignKey(AttributeValue, related_name="product_attribute_values", on_delete=models.CASCADE, default=None)
    product = models.ForeignKey(Product, related_name="product_attributes", on_delete=models.CASCADE, default=None)
    class Meta:
        db_table = "product_attribute"


class ShoppingCart(models.Model):
    product = models.ForeignKey(Product, related_name="shopping_cart_list", on_delete=models.CASCADE)
    attributes = models.TextField()
    quantity = models.PositiveIntegerField(default=1)
    buy_now = models.BooleanField(default=True)
    added_on = models.DateTimeField(auto_created=True)

    class Meta:
        db_table = "shopping_cart"

class ShippingRegion(models.Model):
    shipping_region = models.CharField(max_length=100)

    class Meta:
        db_table = "shipping_region"
    
    def __str__(self):
        return self.shipping_region

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    credit_card = models.TextField()
    address_1 = models.CharField(max_length=100, null=True, blank=True)
    address_2 = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    region = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    shipping_region = models.ForeignKey(ShippingRegion, related_name="customer_list", on_delete=models.CASCADE)
    day_phone = models.CharField(max_length=100, null=True, blank=True)
    eve_phone = models.CharField(max_length=100, null=True, blank=True)
    mob_phone = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = "customer"
    
    def __str__(self):
        return super().__str__()

class Shipping(models.Model):
    shipping_type = models.CharField(max_length=100, null=True, blank=True)
    shipping_cost = models.DecimalField(max_digits=5, decimal_places=2)
    shipping_region = models.ForeignKey(ShippingRegion, related_name="shipping_list", on_delete=models.CASCADE)

    class Meta:
        db_table = "shipping"
    
    def __str__(self):
        return '%s : %s'%(self.shipping_type, self.shipping_region.shipping_region)

class Tax(models.Model):
    tax_type = models.CharField(max_length=100, null=True, blank=True)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        db_table = "tax"

class Order(models.Model):
    total_amount = models.DecimalField(default=0.00, max_digits=5, decimal_places=2)
    created_on = models.DateTimeField(auto_created=True)
    shipped_on = models.DateTimeField(null=True, blank=True)
    status = models.PositiveIntegerField(default=0)
    comments = models.CharField(max_length=255)
    customer = models.ForeignKey(Customer, related_name="customer_orders_list", on_delete=models.CASCADE, default=None)
    auth_code = models.CharField(max_length=50, null=True, blank=True)
    reference = models.CharField(max_length=50, blank=True, null=True)
    shipping = models.ForeignKey(Shipping, related_name="shipping_orders_list", on_delete=models.CASCADE, default=None)
    tax = models.ForeignKey(Tax, related_name="tax_orders_list", on_delete=models.CASCADE,  default=None)

    class Meta:
        db_table = "orders"

class OrderDetail(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="order_details_list", on_delete=models.CASCADE)
    attributes = models.TextField()
    product_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)
    unit_cost = models.DecimalField(default=0.00, max_digits=5, decimal_places=2)

    class Meta:
        db_table = "order_details"

class Audit(models.Model):
    order = models.ForeignKey(Order, related_name="audit_list", on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_created=True)
    message = models.TextField()
    code = models.PositiveIntegerField()

    class Meta:
        db_table = "audit"
    
    def __str__(self):
        return super().__str__()

class Review(models.Model):
    customer = models.ForeignKey(Customer, related_name="customer_review_list", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="product_review_list", on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.PositiveIntegerField(default=1)
    created_on = models.DateTimeField(auto_created=True)

    class Meta:
        db_table = "review"
    
    def __str__(self):
        return super().__str__()


# On every user created , respective customer and token should be created