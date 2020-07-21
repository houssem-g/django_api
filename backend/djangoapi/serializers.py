from rest_framework import serializers
from .models import Peaks

class DjangoapiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Peaks
        fields = ('id', 'lat', 'lon', 'altitude', 'name')