from django.contrib import admin

# Register your models here.
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
    Order,
    OrderDetail,
    Audit,
    Customer
)

class CategoryInline(admin.StackedInline):
    model = Category
    fk_name = "department"

class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("id","name", "description")
    list_display_links = ("id","name")
    list_filter = ("name","id")
    # radio_fields = {"name": admin.VERTICAL}
    inlines = [
        CategoryInline
    ]

class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "department")
    list_display_links = ("id", "name", "department")
    list_filter = ("id", "name")
    # radio_fields = {"department" : admin.VERTICAL}

class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "discounted_price", "display")
    list_display_links = ("id", "name", "price", "discounted_price")
    list_filter = ("id", "name", "price")

class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "category")
    list_display_links = ("id", "product", "category")
    list_filter = ( "category__name",)

class AttributeValueInline(admin.StackedInline):
    model = AttributeValue

class AttributeAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", "name")
    list_filter = ("name",)
    inlines = [
        AttributeValueInline
    ]

class AttributeValueAdmin(admin.ModelAdmin):
    list_display = ("id", "value", "attribute")
    list_display_links = ("id", "value", "attribute")
    list_filter = ("id", "value")


class ProductAttributeAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "attributevalue")
    list_display_links = ("id", "product", "attributevalue")
    list_filter = ("id",)

class ShippingRegionAdmin(admin.ModelAdmin):
    list_display = ("id", "shipping_region")
    list_display_links = ("id", "shipping_region")
    list_filter = ("shipping_region",)

class ShippingAdmin(admin.ModelAdmin):
    list_display = ("id", "shipping_type", "shipping_cost", "shipping_region")
    list_display_links = ("id", "shipping_type", "shipping_region")
    list_filter = ("shipping_type", "shipping_region")

admin.site.register(Department, DepartmentAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)

admin.site.register(ProductCategory, ProductCategoryAdmin)
admin.site.register(Attribute, AttributeAdmin)
admin.site.register(AttributeValue, AttributeValueAdmin)
admin.site.register(ProductAttribute, ProductAttributeAdmin)
admin.site.register(ShippingRegion, ShippingRegionAdmin)
admin.site.register(Shipping, ShippingAdmin)

admin.site.register(
    [
    Tax,
    ShoppingCart,
    Order,
    OrderDetail,
    Audit,
    Customer]
)