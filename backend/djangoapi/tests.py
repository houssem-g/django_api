from django.test import TestCase
from .models import Peaks
class DjangoapiModelTest(TestCase):
    
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
