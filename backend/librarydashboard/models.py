from django.conf import settings
from django.db import models
from django.utils import timezone

class Libuser(models.Model):
    token = models.CharField(max_length=100)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    contactno = models.IntegerField()

    def __str__(self):
        return self.token

class Books(models.Model):
    name = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)
    bookIssueTo = models.CharField(max_length=100,null=True)
    buyingDate = models.DateTimeField()    
    dateOfIssue = models.DateTimeField(null=True)
    dateOfSubmit = models.DateTimeField(null=True)
    token = models.CharField(max_length=100,null=True)

    def __str__(self):
        return self.name

class Reviews(models.Model):
    book_id = models.IntegerField()
    user_name = models.CharField(max_length=100)
    Review = models.CharField(max_length=500)
