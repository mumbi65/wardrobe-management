from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Category, ClothingItem
from .serializers import CategorySerializer, ClothingItemSerializer

# Create your views here.
class   CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ClothingItemViewSet(viewsets.ModelViewSet):
    serializer_class = ClothingItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ClothingItem.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)