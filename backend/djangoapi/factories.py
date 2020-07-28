"""Model factories for the peak project."""

from .models import Peaks

from factory.fuzzy import FuzzyChoice, FuzzyInteger, FuzzyDecimal
from factory.django import DjangoModelFactory


class PeakFactory(DjangoModelFactory):
    """ModelFactory for the Peak object."""

    class Meta:  # noqa
        model = Peaks
    id = FuzzyInteger(1, 1000)
    lat = FuzzyDecimal(0, 1000.0, 1)
    lon = FuzzyDecimal(0, 1000.0, 1)
    altitude = FuzzyInteger(1, 1000)
    name = FuzzyChoice(['Panthéon',
                           'Taj Mahal',
                           'Les Pyramides',
                           'Le Colisée',
                           'Les Jardins Suspendus',
                           ])


