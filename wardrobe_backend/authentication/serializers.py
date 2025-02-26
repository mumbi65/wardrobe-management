from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

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
    

class CustomAuthTokenSerializer(serializers.Serializer):
    username_or_email = serializers.CharField(label="Username or Email")
    password = serializers.CharField(label="Password", style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, attrs):
        username_or_email = attrs.get('username_or_email')
        password = attrs.get('password')

        if username_or_email and password:
            if "@" in username_or_email:
                    try:
                        user_obj = User.objects.get(email=username_or_email)
                        username = user_obj.username
                    except User.DoesNotExist:
                        raise serializers.ValidationError(
                            _("No user found with this email address."),
                            code='authorization'
                        )

            else:
                username = username_or_email

            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                raise serializers.ValidationError(
                    _("Unable to log in with provided credentials."),
                    code='authorization'
                )
        else:
            raise serializers.ValidationError(
                _("Must include 'username_or_email' and 'password'."),
                code='authorization'
            )

        attrs['user'] = user
        return attrs