from django_filters import rest_framework as filters
from .models import Job

class JobsFilter(filters.FilterSet):

    # search
    keyword = filters.CharFilter(field_name='title', lookup_expr='icontains')
    location = filters.CharFilter(field_name='address', lookup_expr='icontains')

    # filter: 給料が入力値か0以上の物をフィルタリング
    min_salary = filters.NumberFilter(field_name='salary' or 0, lookup_expr='gte')
    max_salary = filters.NumberFilter(field_name='salary' or 1000000, lookup_expr='lte')

    class Meta:
        model = Job
        fields = ('keyword', 'location', 'education', 'jobType', 'experience', 'min_salary', 'max_salary')