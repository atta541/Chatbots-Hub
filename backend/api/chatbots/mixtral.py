

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_groq import ChatGroq

# # Assuming you have set your API key directly here for simplicity
# llm = ChatGroq(
#     temperature=0,
#     groq_api_key="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",
#     model_name="mixtral-8x7b-32768"
# )

# class mixtral(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         if user_input:
#             bot_response = llm.invoke(user_input)
#             return Response({'response': bot_response.content}, status=status.HTTP_200_OK)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)


 





from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

# Initialize the LLM and memory
llm = ChatGroq(
    temperature=0,
    groq_api_key="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",  # Replace with a secure method of handling API keys
    model_name="mixtral-8x7b-32768"
)
memory = ConversationBufferMemory()

# Initialize the ConversationChain
conversation = ConversationChain(
    llm=llm, 
    # verbose=True, 
    memory=memory
)

class MixtralAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if user_input:
            # Use the conversation chain to predict the response
            bot_response = conversation.predict(input=user_input)
            return Response({'response': bot_response}, status=status.HTTP_200_OK)
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
