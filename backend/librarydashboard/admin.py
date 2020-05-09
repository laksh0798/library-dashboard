from django.contrib import admin

# Register your models here.
from .models import Libuser, Books ,Reviews
admin.site.register(Libuser)
admin.site.register(Books)
admin.site.register(Reviews)