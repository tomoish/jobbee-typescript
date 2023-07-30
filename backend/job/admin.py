from django.contrib import admin
from .models import CandidatesApplied, Job

admin.site.register(Job)
admin.site.register(CandidatesApplied)