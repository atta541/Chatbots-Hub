
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_groq import ChatGroq
# from langchain.chains.conversation.memory import ConversationBufferMemory
# from langchain.chains import ConversationChain
# from langchain_core.prompts import ChatPromptTemplate

# # Define the resume content
# resume_content = """
# Atta-ur-Rehman

# E-mail: attareh542@gmail.com
# LinkedIn: Atta-ur-rehman/LinkedIn/Profile
# Github: Atta-ur-rehman/github
# Mobile: +92 332 0428838
# Website: atta-ur-rehman
# Lahore Pakistan

# SUMMARY
# I am a skilled AI/ML specialist with expertise in fine-tuning and optimizing models like GPT and Llama3. Experienced in Python and Django, I specialize in developing generative AI solutions using LLMs such as OpenAI models, LangChain, and RAG. Passionate about leveraging AWS for scalable solutions and enhancing NLP capabilities. Completed a final year project focused on Generative AI, Chatbots, and fine-tuning LLMs using Django and React.js.

# SKILLS
# - Programming Languages: Python (including LLMs for NLP tasks), JavaScript, TypeScript
# - AI/ML Frameworks: OpenAI models, LangChain, RAG 
# - Web Development: Backend: Django, Node.js, Express.js; Frontend: React.js
# - APIs: Proficient in RESTful API design and integration
# - Database: MySQL, PostgreSQL, Sequelize ORM, TypeORM

# EXPERIENCE
# AI/ML 
# - Freelance | January 2023 - Present
#   - Fine-tuned and optimized language models such as GPT and LLaMA 3.
#   - Developed generative AI solutions using LLMs like OpenAI models, LangChain, and RAG.

# Full Stack Developer
# - Start-up Company | January 2023 - June 2023
#   - React.js: Developed and maintained dynamic user interfaces for web applications.
#   - Django: Designed and implemented robust backend solutions for web services.
#   - JavaScript: Built interactive and responsive web components.
#   - Collaborated with cross-functional teams to deliver high-quality software products.
#   - Built and optimized backend services using Django framework.
#   - Integrated RESTful APIs for various applications.
#   - Utilized PostgreSQL and MySQL databases for efficient data management.

# Projects:
# 1. Blogging Website: Built a React.js and Django blog on AI's impact on cryptocurrency, covering trading, security, and more.
# 2. LLM Models & Chatbots: Integrated LLMs (Llama3, Mixtral, GPT-4o, etc.) with React.js and Django for enhanced user interaction.
# 3. Text-to-SQL Chatbot: Developed a chatbot using Llama3 to convert text to SQL queries and generate histograms.
# 4. Email-Agent: Created AI agents with Llama3-70b-8192 for automated email processing and personalized responses.

# EDUCATION
# BSCS: The University of Lahore
# I.COM: Unique Group of College
# Matric: Computer Science
# """

# # Define the prompt template with a refined system message
# prompt_template = ChatPromptTemplate.from_messages([
#     ("system", f"""
# You are an AI assistant who is well-versed in the following resume information. Use this information to answer any questions related to the resume accurately and professionally. If the information is not present in the resume, respond with 'I don't have information on that.'

# Resume Information:
# {resume_content}
#     """),
#     ("user", "{message}")
# ])

# # Initialize the LLM and memory
# llm = ChatGroq(
#     temperature=0,
#     groq_api_key="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",  # Replace with a secure method of handling API keys
#     model_name='llama-3.1-70b-versatile'
# )
# memory = ConversationBufferMemory()

# # Initialize the ConversationChain
# conversation = ConversationChain(
#     llm=llm, 
#     memory=memory
# )

# class AttaAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
        
#         if user_input:
#             # Format the prompt with the user's message
#             formatted_prompt = prompt_template.format(message=user_input)
            
#             # Use the formatted prompt in the conversation
#             bot_response = conversation.predict(input=formatted_prompt)
            
#             return Response({'response': bot_response}, status=status.HTTP_200_OK)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)







# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_groq import ChatGroq
# from langchain.chains.conversation.memory import ConversationBufferMemory
# from langchain.chains import ConversationChain
# from django.contrib.auth.models import User
# from models import Conversation,Chatbot

# # Initialize the LLM and memory
# llm = ChatGroq(
#     temperature=0,
#     groq_api_key="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",  # Replace with a secure method of handling API keys
#    model_name='llama-3.1-70b-versatile'
# )
# memory = ConversationBufferMemory()

# # Initialize the ConversationChain
# conversation = ConversationChain(
#     llm=llm, 
#     # verbose=True, 
#     memory=memory
# )


# class AttaAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         if user_input:
#             bot_response = conversation.predict(input=user_input)

#              Chatbot.objects.create(
#                 chatbot='atta',
                
#             )
            
#              Conversation.objects.create(
#                 user=User
#                 chatbot=chatbot,
#                 user_message=user_input,
#                 bot_response=bot_response
#             )




#             return Response({'response': bot_response}, status=status.HTTP_200_OK)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from django.contrib.auth.models import User
from ..models import Conversation, Chatbot  # Ensure correct import path

# Initialize the LLM and memory
llm = ChatGroq(
    temperature=0,
    groq_api_key="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",  # Replace with a secure method of handling API keys
    model_name='llama-3.1-70b-versatile'
)
memory = ConversationBufferMemory()

# Initialize the ConversationChain
conversation = ConversationChain(
    llm=llm,
    memory=memory
)

class AttaAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if user_input:
            # Ensure the user is authenticated
            if not request.user or not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            # Use the logged-in user
            user = request.user

            # Get or create a chatbot instance
            chatbot, created = Chatbot.objects.get_or_create(name='atta')

            # Get the bot response
            bot_response = conversation.predict(input=user_input)

            # Create a new Conversation instance
            Conversation.objects.create(
                user=user,  # Automatically associate with the logged-in user
                chatbot=chatbot,
                user_message=user_input,
                bot_response=bot_response
            )

            return Response({'response': bot_response}, status=status.HTTP_200_OK)
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
