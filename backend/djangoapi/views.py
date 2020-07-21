from rest_framework import generics

from .models import Peaks
from .serializers import DjangoapiSerializer

# Create your views here.
# https://stackoverflow.com/questions/16668441/django-get-and-post-handling-methods
class ListPeaks(generics.ListAPIView):
    queryset = Peaks.objects.all()
    serializer_class = DjangoapiSerializer
class DetailPeaks(generics.RetrieveAPIView):
    queryset = Peaks.objects.all()
    serializer_class = DjangoapiSerializer    
