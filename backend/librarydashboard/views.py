from django.shortcuts import render, HttpResponse
from librarydashboard.models import Libuser ,Books, Reviews
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from datetime import datetime
@csrf_exempt
def user_list(request,token):
    if request.method == "GET":
        user = Libuser.objects.get(token=token)
        data = {}
        data.update(firstname = user.firstname)
        data.update(lastname = user.lastname)
        data.update(email= user.email)
        data.update(position = user.position)
        data.update(contactno = user.contactno)
        return JsonResponse({'user' : data})
    
@csrf_exempt
def create_user(request):
    if request.method == "POST":
        req_body = request.body
        req = json.loads(req_body)
        firstname = req['firstName']
        lastname = req['lastName']
        token = req['token']
        position = req['position']
        contactno = req['contactno']
        email = req['email']
        user = Libuser.objects.create(token=token,firstname=firstname,lastname=lastname,position=position,email=email,contactno=contactno)
        if user != "":
            return JsonResponse({'success': True, 'msg': "New user created"})
    elif request.method == 'PUT':
        req_body = request.body
        req = json.loads(req_body)
        user = Libuser.objects.get(token=req['token'])
        user.firstname = req['firstName']
        user.lastname = req['lastName']
        user.position = req['position']
        user.contactno = req['contactno']
        user.email = req['email']
        status = user.save()
        if status != "":
            return JsonResponse({'success': True, 'msg': "user Info Updated"})

@csrf_exempt
def add_book(request):
    if request.method == "POST":
        today = datetime.today()
        d1 = today.strftime("%Y-%m-%d %H:%M:%S")
        print(datetime.today())
        req_body = request.body
        req = json.loads(req_body)
        name = req['bookname']
        owner = req['owner']
        # bookIssueTo = 'laxman'
        buyingDate = d1  
        # dateOfIssue = d1
        # dateOfSubmit = d1
        new_book = Books.objects.create(name=name,owner=owner,buyingDate=buyingDate)
        if new_book != "":
            return JsonResponse({'success': True, 'msg': "New book Added"})

@csrf_exempt
def get_books(request,token,page):
    if request.method == 'GET':
        row_per_page = 5
        page_number = page+1
        page_end = page_number * row_per_page
        page_start = page_end - row_per_page 
        if token == 'null':
            books = Books.objects.all()[page_start:page_end]
            Count = books.count()
            data = []
            for i in books:
                data.append({'id':i.id,'name':i.name, 'owner':i.owner, 'bookIssueTo':i.bookIssueTo,'dateOfIssue':i.dateOfIssue,'dateOfSubmit':i.dateOfSubmit})
            return JsonResponse({'count': Count,'books' : data})
        
        elif token != 'null':
            books = Books.objects.filter(token=token)[page_start:page_end]
            data = []
            for i in books:
                data.append({'id':i.id,'name':i.name, 'owner':i.owner, 'bookIssueTo':i.bookIssueTo,'dateOfIssue':i.dateOfIssue,'dateOfSubmit':i.dateOfSubmit})
            print(data)
            return JsonResponse({'count': books.count(),'books' : data})

@csrf_exempt
def update_books_status(request):
    if request.method == "PUT":
        req_body = request.body
        req = json.loads(req_body)
        user = Libuser.objects.get(token=req['token'])
        if req['action'] == 'get':
            today = datetime.today()
            book = Books.objects.get(id=req['id'])
            book.bookIssueTo = user.firstname + " " + user.lastname
            book.token = req['token']
            book.dateOfIssue = today.strftime("%Y-%m-%d %H:%M:%S")
            book.save()
            return JsonResponse({'success': True, 'msg': "Book added to your Account"})
        elif req['action'] == 'return':
            if req['Review'] != '':
                Reviews.objects.create(book_id=req['id'],user_name=user.firstname + " " + user.lastname,Review =req['Review'])
            book = Books.objects.get(id=req['id'])
            book.bookIssueTo = None
            book.dateOfIssue = None
            book.token = None
            book.save()
            return JsonResponse({'success': True, 'msg': "Book returned"})

@csrf_exempt
def book_review(request,id):
    Review = Reviews.objects.filter(book_id=id)
    data = []
    for i in Review:
        data.append({'name':i.user_name, 'user_Review':i.Review})
    return JsonResponse({'Reviews' : data})
