from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ClothingItemViewSet

router = DefaultRouter()
router.register(r'clothing-items', ClothingItemViewSet, basename='clothingitem')
router.register(r'categories', CategoryViewSet, basename='category')


urlpatterns = router.urls