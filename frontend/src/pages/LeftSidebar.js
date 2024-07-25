

// // ///////////////////////////////// WORKING CODE END ////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Llama3Chatbot from '../components/Llama3Chatbot';
// import MixtralChatbot from '../components/MixtralChatbot';
// import Gemma from '../components/Gemma';
// import { getUserStatus } from '../api'; // Assume this function fetches user status

// function LeftSidebar() {
//   const location = useLocation();
//   const [selectedChatbot, setSelectedChatbot] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [hasGemmaAccess, setHasGemmaAccess] = useState(false);

//   useEffect(() => {
//     const fetchUserStatus = async () => {
//       try {
//         const response = await getUserStatus();
//         setHasGemmaAccess(response.hasGemmaAccess);
//       } catch (error) {
//         console.error('Failed to fetch user status:', error);
//       }
//     };

//     fetchUserStatus();
//   }, []);

//   const handleChatbotClick = (chatbotName) => {
//     if (chatbotName === 'Gemma' && !hasGemmaAccess) {
//       alert('You need to purchase access to use Gemma.');
//       return;
//     }
//     setSelectedChatbot(chatbotName);
//     setIsSidebarOpen(false);
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-[85vh] w-full mt-7">
//       {/* Mobile Dropdown Button */}
//       <button
//         className="md:hidden p-3 bg-gray-700 text-white rounded-md mb-3"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         {isSidebarOpen ? 'Close Menu' : 'view chatbots'}
//       </button>

//       {/* Sidebar for Desktop and Dropdown Menu for Mobile */}
//       <div
//         className={`md:flex ${isSidebarOpen ? 'flex' : 'hidden'} md:w-[25vh] w-full p-3 rounded-md shadow-md flex-col items-center md:mr-3 md:mb-0 mb-3 ${location.pathname === '/chatbots' ? 'bg-gray-900' : 'bg-transparent'}`}
//       >
//         <div className="flex flex-col gap-2 w-full">
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Llama3')}
//           >
//             Llama3
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Mixtral')}
//           >
//             Mixtral
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Gemma')}
//           >
//             Gemma
//           </button>
          
//           {/* Additional buttons */}
//         </div>
//       </div>

//       {/* Chatbot Display Area */}
//       <div className="flex-1 p-5 rounded-md shadow-md flex justify-center items-center bg-custom-gray">
//         {selectedChatbot === 'Llama3' && <Llama3Chatbot />}
//         {selectedChatbot === 'Mixtral' && <MixtralChatbot />}
//         {selectedChatbot === 'Gemma' && hasGemmaAccess && <Gemma />}
//       </div>
//     </div>
//   );
// }

// export default LeftSidebar;






import React, { useState,  } from 'react';
import { useLocation } from 'react-router-dom';
import Llama3Chatbot from '../components/Llama3Chatbot';
import MixtralChatbot from '../components/MixtralChatbot';
import Gemma from '../components/Gemma';
import ONE from '../pages/vedios/ONE.mp4';
import PDF from '../components/PDF'

const videoStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '10px',
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
    <div className="flex flex-col md:flex-row h-[85vh] w-full mt-7 ">
      {/* Mobile Dropdown Button */}
      <button
        className="md:hidden p-3 bg-gray-700 text-white rounded-md mb-3"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close Menu' : 'View Chatbots'}
      </button>

      {/* Sidebar for Desktop and Dropdown Menu for Mobile */}
      <div
        className={`md:flex ${isSidebarOpen ? 'flex' : 'hidden'} md:w-[25vh] w-full p-3 rounded-md shadow-md flex-col items-center md:mr-3 md:mb-0 mb-3 ${location.pathname === '/chatbots' ? 'bg-gray-900' : 'bg-transparent'}`}
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
            onClick={() => handleChatbotClick('PDF')}
          >
            Upload File
          </button>
          {/* Additional buttons */}
        </div>
      </div>

      {/* Chatbot Display Area */}
      <div className="flex-1 p-5 rounded-md shadow-md flex justify-center items-center bg-custom-gray">
        {selectedChatbot === null ? (
          <video style={videoStyle} autoPlay loop muted>
            <source src={ONE} type="video/mp4" />
          </video>
        ) : (
          <>
            {selectedChatbot === 'Llama3' && <Llama3Chatbot />}
            {selectedChatbot === 'Mixtral' && <MixtralChatbot />}
            {selectedChatbot === 'Gemma' && <Gemma />}
            {selectedChatbot === 'PDF' && <PDF />}

          </>
        )}
      </div>
    </div>
  );
}

export default LeftSidebar;
