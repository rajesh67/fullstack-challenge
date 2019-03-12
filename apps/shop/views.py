from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)

from apps.shop.serializers import (
    UserSerializer,
    DepartmentSerializer,
    CategorySerializer,
    ProductSerializer,
    ProductCategorySerializer,
    AttributeSerializer,
    AttributeValueSerializer,
    ProductAttributeSerializer,
    ShippingRegionSerializer,
    ShippingSerializer,
    TaxSerializer,

    ShoppingCartSerializer
)
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

SAFE_METHODS = ["POST", "UPDATE"]

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username is None or password is None:
        return Response(
            {'error':'Please provide both username and password'},
            status=HTTP_400_BAD_REQUEST
        )
    user = authenticate(username=username, password=password)

    if not user:
        return Response(
            {'error': 'Invalid Credentials'},
            status=HTTP_404_NOT_FOUND
        )
    token, _ = Token.objects.get_or_create(user = user)
    user_data = UserSerializer(User.objects.get(username=username), many=False)
    # print()
    return Response(
        {'token': token.key, 'user':user_data.data},
        status=HTTP_200_OK
    )

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def register(request):
    print(request.data)
    serializer_data = UserSerializer(data=request.data)
    if serializer_data.is_valid():
        user_data = serializer_data.save()
        user_data.set_password(user_data.password)
        user_data.save()

        user = authenticate(username=user_data.username, password=request.data.get('password', None))
        if not user:
            return Response(
                {'error': 'Invalid Credentials'},
                status=HTTP_404_NOT_FOUND
            )
        token, _ = Token.objects.get_or_create(user = user)
        # serializer_data.pop('password')
        return Response(
            {'token': token.key, 'user' : serializer_data.data},
            status=HTTP_201_CREATED
        )
    else:
        return Response({'errors':serializer_data.errors}, status=HTTP_400_BAD_REQUEST)

class UserList(APIView):
    """
    List all users, or create a new user
    """

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DepartmentList(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentDetails(generics.RetrieveUpdateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer   

class CategoryDetails(generics.RetrieveUpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # def retrieve(self, * args, **kwargs):
    #     category = self.get_object()
    #     products = ProductCategory.objects.filter(category=category)
    #     context_data = super.retrieve(self, *kw)
    #     product_serializer = ProductSerializer(products, many=True)
    #     context_data["products"] = product_serializer.data
    #     return context_data

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('name',)
    ordering_fields = ('name', 'price', 'discounted_price')

class ProductDetails(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductCategoryList(generics.ListCreateAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('category', )
    

class ProductCategoryDetails(generics.RetrieveUpdateAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

class AttributeList(generics.ListCreateAPIView):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer

class AttributeDetails(generics.RetrieveUpdateAPIView):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer

class AttributeValueList(generics.ListCreateAPIView):
    queryset = AttributeValue.objects.all()
    serializer_class = AttributeValueSerializer

class AttributeValueDetails(generics.RetrieveUpdateAPIView):
    queryset = AttributeValue.objects.all()
    serializer_class = AttributeValueSerializer

class ProductAttributeList(generics.ListCreateAPIView):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer

class ProductAttributeDetails(generics.RetrieveUpdateAPIView):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer

class ShippingRegionList(generics.ListCreateAPIView):
    queryset = ShippingRegion.objects.all()
    serializer_class = ShippingRegionSerializer

class ShippingRegionDetails(generics.RetrieveUpdateAPIView):
    queryset = ShippingRegion.objects.all()
    serializer_class = ShippingRegionSerializer

class ShippingList(generics.ListCreateAPIView):
    queryset = Shipping.objects.all()
    serializer_class = ShippingSerializer

class ShippingDetails(generics.RetrieveUpdateAPIView):
    queryset = Shipping.objects.all()
    serializer_class = ShippingSerializer


class TaxList(generics.ListCreateAPIView):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer

class TaxDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer

class ShoppingCartList(generics.ListCreateAPIView):
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer

class ShoppingCartDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer
