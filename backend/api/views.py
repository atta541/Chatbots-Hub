from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def check_auth(request):
    if request.user.is_authenticated:
        return Response({"user": request.user.username}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def login_page(request):
    if request.method == "POST":
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not User.objects.filter(username=username).exists():
            return Response({"error": "Invalid Username"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        
        if user is None:
            return Response({"error": "Invalid Password"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            login(request, user)
            return Response({"message": "Login successful", "user": username}, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
from django.contrib.auth.models import User



@api_view(['POST'])
def register_page(request):
    if request.method == 'POST':
        # Get the data from the request
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if all required fields are provided
        if not all([first_name, last_name, email, username, password]):
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate the email format
        try:
            validate_email(email)
        except ValidationError:
            return Response({"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if username or email already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user with appropriate permissions
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        user.is_staff = True
        user.is_superuser = True  # or user.is_superuser = True if needed
        user.save()

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    







    
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import UploadedPDF
# from .serializers import UploadedPDFSerializer

# class PdfAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         if 'pdf' not in request.FILES:
#             return Response({'error': 'No PDF file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

#         pdf_file = request.FILES['pdf']
#         serializer = UploadedPDFSerializer(data={'file': pdf_file})

#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': 'PDF uploaded and saved successfully.'}, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
