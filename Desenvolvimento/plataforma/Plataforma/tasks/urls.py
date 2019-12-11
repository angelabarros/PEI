from rest_framework import routers
from .api import TaskViewSet #RegisterTaskAPI

router=routers.DefaultRouter()
router.register('api/tasks', TaskViewSet, 'tasks')
#router.register('api/register/tasks', RegisterTaskAPI, 'regtasks')



from django.urls import path,include


urlpatterns = [
    path('', include(router.urls)),
   # path('api/tasks/register', RegisterTaskAPI.as_view(),name='reg_task')
]

#urlpatterns = [
#	path('api/tasks', TaskViewSet.as_view()),
#	path('api/tasks/register', TaskViewSet.as_view()),






#]