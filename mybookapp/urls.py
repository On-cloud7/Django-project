from django.contrib import admin
from django.urls import path, re_path
from django.views.static import serve
from django.views.generic import TemplateView
from core import views
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    path('signup/', TemplateView.as_view(template_name="user-signup.html")),
    path('signin/', TemplateView.as_view(template_name="user-signin.html")),
    path('admin-signin/', TemplateView.as_view(template_name="admin-signin.html")),
    path('manga-list/', TemplateView.as_view(template_name="Manga List.html")),
    path('about-us/', TemplateView.as_view(template_name="about-us.html")),
    path('contact-us/', TemplateView.as_view(template_name="contact-us.html")),
    path('lr/', TemplateView.as_view(template_name="LR.html")),
    path('pb/', TemplateView.as_view(template_name="PB.html")),
    path('user-account/', TemplateView.as_view(template_name="user-account.html")),
    path('user-forgot-password/', TemplateView.as_view(template_name="user-forgot-password.html")),
    path('admin-forgot-password/', TemplateView.as_view(template_name="admin-forgot-password.html")),
    path('admin-home/', TemplateView.as_view(template_name="admin_home.html")),
    path('api/signup/', views.signup),
    re_path(r'^(?P<path>(img|js|css)/.*|\w+\.html)$', serve, {'document_root': settings.STATICFILES_DIRS[0]}),

    # New path for book opretions 
    path('', views.book_list, name='book_list'),
    path('create-book/', views.create_book, name='create_book'),
    path('update-book/<int:pk>/', views.update_book, name='update_book'),
    path('delete-book/<int:pk>/', views.delete_book, name='delete_book'),
    path('create-review/', views.create_review, name='create_review'),
    path('add-review/', views.add_review, name='add_review'),          
    path('get-books/', views.get_books, name='get_books'),
    path('add-review/', views.add_review, name='add_review'),
    
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('logout/', views.logout_view, name='logout'),

]