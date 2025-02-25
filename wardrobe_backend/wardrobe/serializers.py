from rest_framework import serializers
from .models import Category, ClothingItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'



class ClothingItemSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    category = CategorySerializer(read_only=True)

    class Meta:
        model = ClothingItem
        fields = '__all__'