

# from django.urls import path
# from .views import (
  
#      login_page, logout_view, register_page
# )

# from .chatbots.llama3 import llama3
# from .chatbots.mixtral import mixtral
# from .chatbots.gemma import gemma


# urlpatterns = [
   


#     # path('api/check-auth/', check_auth, name='check-auth'),
#     path('api/login/', login_page, name='login'),
#     path('api/logout/', logout_view, name='logout'),
#     path('api/register/', register_page, name='register'),
#     path('api/llama3/', llama3.as_view(), name=''),
#     path('api/mixtral/', mixtral.as_view(), name=''),
#     # path('api/gemma/', gemma.as_view, name=''),
#     path('api/gemma/', gemma.as_view(), name=''),



# ]








# from django.urls import path
# from .views import (
#     login_page, logout_view, register_page
# )
# from .chatbots.llama3 import Llama3APIView
# from .chatbots.mixtral import MixtralAPIView
# from .chatbots.gemma import GemmaAPIView


# urlpatterns = [
#     path('api/login/', login_page, name='login'),
#     path('api/logout/', logout_view, name='logout'),
#     path('api/register/', register_page, name='register'),
#     path('api/llama3/', Llama3APIView.as_view(), name='llama3'),
#     path('api/mixtral/', MixtralAPIView.as_view(), name='mixtral'),
#     path('api/gemma/', GemmaAPIView.as_view(), name='gemma'),

# ]




# from django.urls import path
# from .views import (
#     login_page, logout_view, register_page
# )
# from .chatbots.llama3 import Llama3APIView
# from .chatbots.mixtral import MixtralAPIView
# from .chatbots.gemma import GemmaAPIView
# # from .chatbots.pdf import PdfAPIView
# # from .views import PdfAPIView
# from django.urls import path
# # from .views import PdfAPIView

# # from .chatbots.pdf import PdfAPIView
# from .chatbots.pdf import PdfChat
# from django.urls import path
# from .chatbots.pdf import PdfAPIView, PdfChat
# from .chatbots.llama3_1 import Llama3_1APIView
# from .chatbots.atta import AttaAPIView
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# urlpatterns = [
#     # path('api/login/', login_page, name='login'),
#     path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     # 
#     path('api/logout/', logout_view, name='logout'),
#     path('api/register/', register_page, name='register'),
#     path('api/llama3/', Llama3APIView.as_view(), name='llama3'),
#     path('api/llama3.1/', Llama3_1APIView.as_view(), name='llama3.1'),
#     path('api/mixtral/', MixtralAPIView.as_view(), name='mixtral'),
#     path('api/gemma/', GemmaAPIView.as_view(), name='gemma'),
#     path('api/atta/', AttaAPIView.as_view(), name='atta'),

#     # path('api/upload_pdf/', PdfAPIView.as_view(), name='upload_pdf'),
#     # path('api/pdfchat/', PdfChat.as_view(), name='pdfchat'),
#     path('api/upload_pdf/', PdfAPIView.as_view(), name='upload_pdf'),
#     path('api/pdfchat/', PdfChat.as_view(), name='pdfchat'),


# ]





from django.urls import path
from .views import (
    login_page, logout_view, register_page
)
from .chatbots.llama3 import Llama3APIView
from .chatbots.mixtral import MixtralAPIView
from .chatbots.gemma import GemmaAPIView
from .chatbots.pdf import PdfAPIView, PdfChat
from .chatbots.llama3_1 import Llama3_1APIView
from .chatbots.atta import AttaAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', logout_view, name='logout'),
    path('api/register/', register_page, name='register'),
    path('api/llama3/', Llama3APIView.as_view(), name='llama3'),
    path('api/llama3.1/', Llama3_1APIView.as_view(), name='llama3.1'),
    path('api/mixtral/', MixtralAPIView.as_view(), name='mixtral'),
    path('api/gemma/', GemmaAPIView.as_view(), name='gemma'),
    path('api/atta/', AttaAPIView.as_view(), name='atta'),
    path('api/upload_pdf/', PdfAPIView.as_view(), name='upload_pdf'),
    path('api/pdfchat/', PdfChat.as_view(), name='pdfchat'),
]
