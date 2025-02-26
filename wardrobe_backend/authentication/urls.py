from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import RegistrationView, CustomObtainAuthToken

urlpatterns = [
    path('login/', CustomObtainAuthToken.as_view(), name='login'),
    path('register/', RegistrationView.as_view(), name='register'),
]