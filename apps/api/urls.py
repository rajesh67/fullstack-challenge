from django.conf.urls import url, include
from django.contrib import admin

from .views import sample_api
from apps.shop.views import UserList

urlpatterns = [

    url(r'^1.0/', include("apps.shop.urls")),
    url(r'^sampleapi', sample_api)
]
