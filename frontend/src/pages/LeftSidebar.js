import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Llama3Chatbot from '../components/Llama3Chatbot';
import MixtralChatbot from '../components/MixtralChatbot';
import Gemma from '../components/Gemma';
import ONE from '../pages/vedios/ONE.mp4';
import PDF from '../components/PDF';
import Llama31Chatbot from '../components/Llama31Chatbot';
import Atta from '../components/Atta';

const videoStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '5px',
};

function LeftSidebar() {
  const location = useLocation();
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChatbotClick = (chatbotName) => {
    setSelectedChatbot(chatbotName);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-[90vh] w-full mt-1">

      {/* Mobile Dropdown Button */}
      <button
        className="md:hidden p-3 bg-gray-700 text-white rounded-md mb-3"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close Menu' : 'View Chatbots'}
      </button>

      {/* Sidebar for Desktop and Dropdown Menu for Mobile */}
      <div
        className={`md:flex ${isSidebarOpen ? 'flex' : 'hidden'} md:w-[15%] w-full p-3 rounded-md shadow-md flex-col items-center md:mr-3 md:mb-0 mb-3 ${location.pathname === '/chatbots' ? 'bg-gray-900' : 'bg-transparent'}`}
      >
        <div className="flex flex-col gap-2 w-full">
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Llama3')}
          >
            Llama3
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Llama3.1')}
          >
            Llama3.1
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Mixtral')}
          >
            Mixtral
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Gemma')}
          >
            Gemma
          </button>


          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Atta')} 
          >
            Chat with Atta
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('PDF')}
          >
            Upload File
          </button>
        </div>
      </div>

      {/* Chatbot Display Area */}
      <div className="flex-1 p-5 rounded-md shadow-md flex justify-center items-center ">
        {selectedChatbot === null ? (
          <video style={videoStyle} autoPlay loop muted>
            <source src={ONE} type="video/mp4" />
          </video>
        ) : (
          <>
            {selectedChatbot === 'Llama3' && <Llama3Chatbot />}
            {selectedChatbot === 'Llama3.1' && <Llama31Chatbot />}
            {selectedChatbot === 'Mixtral' && <MixtralChatbot />}
            {selectedChatbot === 'Gemma' && <Gemma />}
            {selectedChatbot === 'Atta' && <Atta />}

            {selectedChatbot === 'PDF' && <PDF />}
          </>
        )}
      </div>

      {/* Right Side Space */}
      {selectedChatbot && (
        <div className="hidden md:block md:w-[15%] p-3 bg-gray-100 border-l border-gray-300">
          {/* Conditionally render content based on the selected chatbot */}
          {selectedChatbot === 'Llama3' && <p>History will be added soon</p>}
          {selectedChatbot === 'Llama3.1' && <p>History will be added soon</p>}
          {selectedChatbot === 'Mixtral' && <p>History will be added soon</p>}
          {selectedChatbot === 'Gemma' && <p>History will be added soon</p>}
          {selectedChatbot === 'PDF' && <p>History will be added soon</p>}
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;



