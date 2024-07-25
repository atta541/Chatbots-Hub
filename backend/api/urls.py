

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




from django.urls import path
from .views import (
    login_page, logout_view, register_page
)
from .chatbots.llama3 import Llama3APIView
from .chatbots.mixtral import MixtralAPIView
from .chatbots.gemma import GemmaAPIView
# from .chatbots.pdf import PdfAPIView
# from .views import PdfAPIView
from django.urls import path
# from .views import PdfAPIView

# from .chatbots.pdf import PdfAPIView
from .chatbots.pdf import PdfChat

from django.urls import path
from .chatbots.pdf import PdfAPIView, PdfChat
urlpatterns = [
    path('api/login/', login_page, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/register/', register_page, name='register'),
    path('api/llama3/', Llama3APIView.as_view(), name='llama3'),
    path('api/mixtral/', MixtralAPIView.as_view(), name='mixtral'),
    path('api/gemma/', GemmaAPIView.as_view(), name='gemma'),
    # path('api/upload_pdf/', PdfAPIView.as_view(), name='upload_pdf'),
    # path('api/pdfchat/', PdfChat.as_view(), name='pdfchat'),
    path('api/upload_pdf/', PdfAPIView.as_view(), name='upload_pdf'),
    path('api/pdfchat/', PdfChat.as_view(), name='pdfchat'),


]



