from django.db import models

# Create your models here.
class Peaks(models.Model):
    lat = models.FloatField(blank=False, null=False)
    lon = models.FloatField(blank=False, null=False)
    altitude = models.IntegerField(blank=False, null=False)
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = "peaks"

