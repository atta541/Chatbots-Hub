

# from langchain_groq import ChatGroq
# # from backend.api.chatbots.gemma import llm


# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView

# # Assuming you have set your API key directly here for simplicity
# llm = ChatGroq(
#     temperature=0,
#     groq_api_key="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",
#     model_name="gemma-7b-it"
# )

# class gemma(APIView):
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
    groq_api_key="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",  
    model_name="gemma-7b-it"
)
memory = ConversationBufferMemory()

conversation = ConversationChain(
    llm=llm, 
    # verbose=True, 
    memory=memory
)

class GemmaAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if user_input:
            bot_response = conversation.predict(input=user_input)
            return Response({'response': bot_response}, status=status.HTTP_200_OK)
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
