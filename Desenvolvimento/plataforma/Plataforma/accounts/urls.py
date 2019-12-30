from django.urls import path, include
# ProponentAPI, ListTasksAPI
from .api import RegisterBidderAPI,UpdateBidderAPI,UpdateProponentAPI, RegisterProponentAPI, ListBiddersAPI, LoginBidderAPI, LoginProponentAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/registar/bidder', RegisterBidderAPI.as_view()),
    path('api/auth/registar/proponent', RegisterProponentAPI.as_view()),
    path('api/auth/entrar/bidder', LoginBidderAPI.as_view()),
    path('api/auth/entrar/proponent', LoginProponentAPI.as_view()),
    path('api/auth/atualizar/proponent', UpdateProponentAPI.as_view()),
    path('api/auth/atualizar/bidder', UpdateBidderAPI.as_view()),
    path('api/auth/bidder/bidders', ListBiddersAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')

]
