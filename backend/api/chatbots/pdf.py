


   
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView

# from ..serializers import UploadedPDFSerializer 





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





# myapp/views.py
# views.py

# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView

# from ..serializers import UploadedPDFSerializer 
# pdf.py
from django.shortcuts import get_object_or_404
from ..models import UploadedPDF
from PyPDF2 import PdfReader
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
# pdf.py

from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from PyPDF2 import PdfReader
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS

# Groq API Key
GROQ_API_KEY = "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"

# Initialize Groq LLM
llm = ChatGroq(
    groq_api_key=GROQ_API_KEY,
    model_name="Llama3-8b-8192"
)

def extract_pdf_text(pdf_id):
    # Fetch the PDF record from the database
    pdf_record = get_object_or_404(UploadedPDF, id=pdf_id)

    # Open and read the PDF file
    pdf_path = pdf_record.file.path
    pdf_reader = PdfReader(pdf_path)
    text = ""
    
    for page in pdf_reader.pages:
        text += page.extract_text() or ""  # Handle cases where extract_text might return None
    
    return text

def process_pdf_text(pdf_text):
    # Split text into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,  # Set chunk size
        chunk_overlap=200,  # Set overlap size
        length_function=len
    )
    text_chunks = text_splitter.split_text(pdf_text)

    # Create vector store
    vectorstore = FAISS.from_texts(texts=text_chunks)
    return vectorstore

class PdfAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Handle PDF file upload
        pdf_file = request.FILES.get('pdf')
        if not pdf_file:
            return Response({'error': 'No PDF file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        uploaded_pdf = UploadedPDF(file=pdf_file)
        uploaded_pdf.save()
        return Response({'pdf_id': uploaded_pdf.id}, status=status.HTTP_201_CREATED)

class PdfChat(APIView):
    def get(self, request, *args, **kwargs):
        pdf_id = request.query_params.get('pdf_id')
        question = request.query_params.get('question')
        
        if not pdf_id:
            return Response({'error': 'No PDF ID provided'}, status=status.HTTP_400_BAD_REQUEST)

        if not question:
            return Response({'error': 'No question provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            pdf_text = extract_pdf_text(pdf_id)
            vectorstore = process_pdf_text(pdf_text)
            retriever = vectorstore.as_retriever()

            # Use the retrieval-based QA chain
            retriever_qa_chain = RetrievalQA(
                retriever=retriever,
                llm=llm
            )

            response = retriever_qa_chain.predict(question)
            return Response({'response': response}, status=status.HTTP_200_OK)
        except Exception as e:
            # Log the error message for debugging purposes
            print(f"Error processing PDF chat: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
