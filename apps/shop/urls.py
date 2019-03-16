from django.conf.urls import url
from django.contrib import admin

from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

from apps.shop.views import (
    UserList,
    DepartmentList,
    DepartmentDetails,
    CategoryList,
    CategoryDetails,
    ProductList,
    ProductDetails,
    ProductCategoryList,
    ProductCategoryDetails,
    AttributeList,
    AttributeDetails,
    AttributeValueList,
    AttributeValueDetails,
    ProductAttributeList,
    ProductAttributeDetails,
    ShippingRegionList,
    ShippingRegionDetails,
    ShippingList,
    ShippingDetails,
    TaxList,
    TaxDetails,
    ShoppingCartList,
    ShoppingCartDetails,

    CustomerList,
    CustomerDetails,
    CustomerBasicInformtion,

    OrderList,
    OrderDetails,
    OrderDetailsList,
    OrderDetailsView,
    AuditList,
    AuditDetails,
    ReviewList,
    ReviewDetails,

    login,
    register
)

router = routers.SimpleRouter()
schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    url(r'^$', schema_view),
    url(r'^login/$', login),
    url(r'^register/$', register),
    url(r'^users/$', UserList.as_view()),
    # url(r'^customers/$', UserList.as_view()),


    url(r'^departments/$', DepartmentList.as_view()),
    url(r'^departments/(?P<pk>\d+)/$', DepartmentDetails.as_view()),
    url(r'^categories/$', CategoryList.as_view()),
    url(r'^categories/(?P<pk>\d+)/$', CategoryDetails.as_view()),
    url(r'^products/$', ProductList.as_view()),
    url(r'^products/(?P<pk>\d+)/$', ProductDetails.as_view()),

    url(r'^product-categories/$', ProductCategoryList.as_view()),
    url(r'^product-categories/(?P<pk>\d+)/$', ProductCategoryDetails.as_view()),
    url(r'^product-attributes/$', ProductAttributeList.as_view()),
    url(r'^product-attributes/(?P<pk>\d+)/$', ProductAttributeDetails.as_view()),

    # url(r'^/$', .as_view()),
    url(r'^attributes/$', AttributeList.as_view()),
    url(r'^attributes/(?P<pk>\d+)/$', AttributeDetails.as_view()),
    url(r'^attributes/values/$', AttributeValueList.as_view()),
    url(r'^attributes/values/(?P<pk>\d+)/$', AttributeValueDetails.as_view()),
    
    url(r'^regions/$', ShippingRegionList.as_view()),
    url(r'^regions/(?P<pk>\d+)/$', ShippingRegionDetails.as_view()),
    
    url(r'^shippings/$', ShippingList.as_view()),
    url(r'^shippings/(?P<pk>\d+)/$', ShippingDetails.as_view()),
    
    url(r'^taxes/$', TaxList.as_view()),
    url(r'^taxes/(?P<pk>\d+)/$', TaxDetails.as_view()),

    url(r'^carts/$', ShoppingCartList.as_view()),
    url(r'^carts/(?P<pk>\d+)/$', ShoppingCartDetails.as_view()),

    url(r'^users/(?P<pk>\d+)$', CustomerBasicInformtion.as_view()),
    url(r'^customers/$', CustomerList.as_view()),
    url(r'^customers/(?P<pk>\d+)/$', CustomerDetails.as_view()),

    url(r'^orders/$', OrderList.as_view()),
    url(r'^orders/(?P<pk>\d+)$', OrderDetails.as_view()),

    url(r'^order-details/$', OrderDetailsList.as_view()),
    url(r'^order-details/(?P<pk>\d+)$', OrderDetailsView.as_view()),
    
    url(r'^audits/$', AuditList.as_view()),
    url(r'^audits/(?P<pk>\d+)$', AuditDetails.as_view()),
    
    url(r'^reviews/$', ReviewList.as_view()),
    url(r'^reviews/(?P<pk>\d+)$', ReviewDetails.as_view()),
]

urlpatterns += router.urls