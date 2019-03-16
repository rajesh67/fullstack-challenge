from ast import literal_eval as make_tuple
from json import loads, dumps

from django.core.management.base import BaseCommand, CommandError
from apps.shop.models import Product

class Command(BaseCommand):
    help = 'loads the sample product data into database'

    def handle(self, *args, **options):

        def _save_product(product_data):
            # print(product_data)
            product, created = Product.objects.get_or_create(
                name=product_data[1],
                description = product_data[2],
                price = product_data[3],
                discounted_price = product_data[4],
                image = product_data[5],
                image_2 = product_data[6],
                thumbnail = product_data[7],
                display = product_data[8]
            )
            print(product)
            if created:
                product.save()
            return product

        with open('tmp/data/products.json', 'r') as f:
            data = f.readlines()
            
            for row in data:
                row_data = row.strip()
                tuple_data = make_tuple(row_data)
                try:
                    # print(tuple_data[0])
                    product = _save_product(tuple_data[0])
                    print("Product created :"+product)
                except Exception:
                    print("Error")
        #Save the product here