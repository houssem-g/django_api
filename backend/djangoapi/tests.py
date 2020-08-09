from django.test import TestCase, Client
from .models import Peaks
from .factories import PeakFactory
from .views import DetailPeaks
from mock import patch
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient, APITestCase, CoreAPIClient
import coreapi
from requests.auth import HTTPBasicAuth
import factory
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User


class SuperUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    username = factory.Faker('email')
    password = factory.LazyFunction(lambda: make_password('root'))
    is_staff = True
    is_superuser = True


class TestDjangoapiModel(APITestCase):
    
    @classmethod
    def setUpTestData(cls):
        # in this function we initilise the object by creation an entry
        Peaks.objects.create(lat="3.5", lon="3.5", altitude="3", name="testName")
    def test_monument(self):
        peak = Peaks.objects.get(id=1)
        expected_object_lat = f'{peak.lat}'
        expected_object_lon = f'{peak.lon}'
        expected_object_altitude = f'{peak.altitude}'
        expected_object_name = f'{peak.name}'
       
        self.assertEquals(expected_object_lat, "3.5")
        self.assertEquals(expected_object_lon, "3.5")
        self.assertEquals(expected_object_altitude, "3")
        self.assertEquals(expected_object_name, "testName")
    
 
    
    def test_detail(self):
        """Test the detail view for a peak object with the Django test client."""
        # user = User.objects.get(username='testuser')
        user = SuperUserFactory.create()
        client = APIClient()
        client.force_authenticate(user=user)
        peak = PeakFactory.build()

    
        with patch.object(DetailPeaks, 'get_object', return_value=peak):
            url = reverse('detail', kwargs={'pk': 1})
            response = client.get(url)
            content = response.content.decode()
            print('content is :', content)
            assert response.status_code == 200
            assert str(peak.id) in content
            assert str(peak.altitude) in content

