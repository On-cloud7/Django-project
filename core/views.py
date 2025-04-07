from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.serializers import serialize
from django.views.decorators.http import require_POST
from .models import UserProfile
import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Book, Review, Author
from .forms import BookForm, ReviewForm, LoginForm
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect


def signin(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect('book_list')
            else:
                form.add_error(None, "Invalid username or password")
    else:
        form = LoginForm()
    return render(request, 'user-signin.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('book_list')


@csrf_exempt  # Skipping CSRF for now will add it later for security
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            # Create a Django User
            user = User.objects.create_user(
                username=data['email'],  # Email as username for simplicity
                email=data['email'],
                password=data['password']
            )
            # Create UserProfile tied to that User
            UserProfile.objects.create(
                user=user,
                phone=data['phone'],
                address=data['address'],
                favorite_genre=data['accountType']
            )
            return JsonResponse({'status': 'success', 'message': 'User created'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({'status': 'error', 'message': 'Only POST allowed'})

def book_list(request):
    books = Book.objects.all()
    return render(request, 'Manga List.html', {'books': books})

@login_required
def create_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('book_list')
    else:
        form = BookForm()
    return render(request, 'create_book.html', {'form': form})

@login_required
def update_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    if request.method == 'POST':
        form = BookForm(request.POST, instance=book)
        if form.is_valid():
            form.save()
            return redirect('book_list')
    else:
        form = BookForm(instance=book)
    return render(request, 'update_book.html', {'form': form})

@login_required
def delete_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    if request.method == 'POST':
        book.delete()
        return redirect('book_list')
    return render(request, 'delete_book.html', {'book': book})

@login_required
def create_review(request):  # Q2 Version
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.user = request.user
            review.save()
            return redirect('book_list')
    else:
        form = ReviewForm()
    return render(request, 'create_review.html', {'form': form})

def get_books(request):
    books = Book.objects.all()
    data = serialize('json', books, fields=('title', 'author', 'genre'))
    return JsonResponse({'books': json.loads(data)}, safe=False)

@login_required
@require_POST
def add_review(request):
    try:
        data = json.loads(request.body)
        book_id = data.get('book_id')
        rating = data.get('rating')
        comment = data.get('comment', '')

        # Server-side validation
        if not book_id or not rating:
            return JsonResponse({'error': 'Book and rating are required'}, status=400)
        if not (1 <= int(rating) <= 5):
            return JsonResponse({'error': 'Rating must be 1-5'}, status=400)
        
        book = get_object_or_404(Book, pk=book_id)
        review = Review.objects.create(
            book=book,
            user=request.user,
            rating=rating,
            comment=comment
        )
        return JsonResponse({
            'success': True,
            'review': {'id': review.id, 'rating': review.rating, 'comment': review.comment}
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)