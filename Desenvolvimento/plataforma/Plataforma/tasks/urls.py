from rest_framework import routers
from .api import TaskViewSet ,BidViewSet#RegisterTaskAPI

router=routers.DefaultRouter()
router.register('api/tasks', TaskViewSet, 'tasks')
router.register('api/registar/bid', BidViewSet, 'bids')



from django.urls import path,include


urlpatterns = [
    path('', include(router.urls)),
    #path('api/registar/bid', BidViewSet)
   # path('api/tasks/register', RegisterTaskAPI.as_view(),name='reg_task')
]

#urlpatterns = [
#	path('api/tasks', TaskViewSet.as_view()),
#	path('api/tasks/register', TaskViewSet.as_view()),






#]