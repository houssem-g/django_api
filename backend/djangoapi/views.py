from rest_framework import generics, permissions
# from snippets.models import Snippet
# from snippets.serializers import SnippetSerializer
from .models import Peaks
from .serializers import DjangoapiSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



# Create your views here.
# https://stackoverflow.com/questions/16668441/django-get-and-post-handling-methods
# class ListPeaks(generics.ListAPIView):
#     queryset = Peaks.objects.all()
#     serializer_class = DjangoapiSerializer
# class DetailPeaks(generics.RetrieveAPIView):

#     queryset = Peaks.objects.all()
#     serializer_class = DjangoapiSerializer    



class ListPeaks(APIView):
    # permission_classes = (permissions.IsAuthenticated,)
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        queryset = Peaks.objects.all()
        serializer = DjangoapiSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DjangoapiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DetailPeaks(APIView):
    # permission_classes = (permissions.IsAuthenticated,)
    """
    Retrieve, update or delete a peaks instance.
    """
    def get_object(self, pk):
        try:
            return Peaks.objects.get(pk=pk)
        except Peaks.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Peaks = self.get_object(pk)
        serializer = DjangoapiSerializer(Peaks)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Peaks = self.get_object(pk)
        serializer = DjangoapiSerializer(Peaks, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Peaks = self.get_object(pk)
        Peaks.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



'''
Il est tout à fait possible de re-écrire les classes au dessus
de manière plus simple. Il faut utilisé les mixin, qui sont des classes pré-codé
et qui réprésentent un comportement réptitif tel que le crud

class ListPeaks(generics.ListCreateAPIView):
    queryset = Peaks.objects.all()
    serializer_class = DjangoapiSerializer


class DetailPeaks(generics.RetrieveUpdateDestroyAPIView):
    queryset = Peaks.objects.all()
    serializer_class = DjangoapiSerializer

'''