from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import RegistrationView

urlpatterns = [
    path('login/', obtain_auth_token, name='login'),
    path('register/', RegistrationView.as_view(), name='register'),
]