from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email')
        )

        Token.objects.create(user=user)
        return user
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        token = Token.objects.get(user=instance)
        response['token'] = token.key
        return response