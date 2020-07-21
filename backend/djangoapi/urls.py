from django.urls import path
from .views import ListPeaks, DetailPeaks

urlpatterns = [
    path('', ListPeaks.as_view()),
    path('<int:pk>/', DetailPeaks.as_view()),
]
