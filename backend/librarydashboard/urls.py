from django.urls import path
from librarydashboard.views import user_list, create_user,add_book
from . import views
urlpatterns = [
    path('user/<slug:token>', views.user_list,name='user_list'),
    path('create-user/', views.create_user,name='create_user'),
    path('add-book/', views.add_book,name='add_book'),
    path('get-books/<int:page>/<slug:token>', views.get_books,name='get_book'),
    path('update_books_status/', views.update_books_status,name='update_book'),
    path('get-book-review/<int:id>', views.book_review,name='book_review')
]
