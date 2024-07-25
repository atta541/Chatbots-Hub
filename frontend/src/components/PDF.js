// import React, { useState } from 'react';
// import axios from 'axios';

// function PDF() {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [userQuestion, setUserQuestion] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setPdfFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!pdfFile) {
//       alert('Please upload a PDF file.');
//       return;
//     }
    
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('pdf', pdfFile);

//     try {
//       await axios.post('http://127.0.0.1:8000/api/upload_pdf/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('PDF uploaded and saved successfully.');
//       setPdfFile(null); // Clear the file input
//     } catch (error) {
//       console.error('Error uploading PDF:', error);
//       alert('Failed to upload PDF.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAskQuestion = async () => {
//     if (!userQuestion) {
//       alert('Please enter a question.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/ask_question/', { question: userQuestion });
//       setChatHistory([...chatHistory, { type: 'user', text: userQuestion }, { type: 'bot', text: response.data.answer }]);
//       setUserQuestion(''); // Clear the question input
//     } catch (error) {
//       console.error('Error asking question:', error);
//       alert('Failed to get an answer.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>PDF Chat</h1>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload PDF'}
//       </button>
//       <div>
//         <textarea
//           rows="4"
//           cols="50"
//           value={userQuestion}
//           onChange={(e) => setUserQuestion(e.target.value)}
//           placeholder="Ask a question about the PDF content"
//         />
//         <button onClick={handleAskQuestion} disabled={loading}>
//           {loading ? 'Processing...' : 'Ask Question'}
//         </button>
//       </div>
//       <div>
//         {chatHistory.map((message, index) => (
//           <div key={index} className={message.type}>
//             {message.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PDF;

// Llama3Chatbot.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const PDF = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      alert('Please upload a PDF file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    try {
      await axios.post('http://127.0.0.1:8000/api/upload_pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('PDF uploaded and saved successfully.');
      setPdfFile(null); // Clear the file input
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Add user message to chat history
    const userMessage = { type: 'user', text: message };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const res = await axios.get('http://127.0.0.1:8000/api/pdfchat/', {
        params: { pdf_id: '1', question: message }  // Adjust pdf_id as needed
      });
      const botResponse = res.data.response;

      // Add bot response to chat history
      const botMessage = { type: 'bot', text: botResponse };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response from chatbot:', error);
      const errorMessage = { type: 'bot', text: 'Error getting response from chatbot.' };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setMessage('');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch((err) => console.error('Failed to copy text:', err));
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className={`flex flex-col h-full w-full font-sans ${darkMode ? 'bg-gray-900' : 'bg-gray-600'}`}>
      <div className={`flex justify-between items-center p-5 border-b border-gray-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-600'}`}>
        <h2 className={`text-2xl text-white ${darkMode ? 'text-white' : 'text-gray-800'}`}>Chat with LLaMA-3 😳</h2>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-700"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto p-5 border border-gray-300 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="flex flex-col">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`relative p-3 rounded-lg ${msg.type === 'user' ? (darkMode ? 'bg-blue-400 text-white' : 'bg-black text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')}`}
                style={{ maxWidth: '70%' }}
              >
                {msg.text}
                {msg.type === 'bot' && (
                  <button
                    className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                    onClick={() => handleCopy(msg.text)}
                  >
                    copy
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={chatContainerRef} /> {/* Scroll reference */}
        </div>
      </div>
      <form className="p-5 border-t border-gray-300 bg-white" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="file"
            className="p-3 border border-gray-300 text-lg rounded-l-lg"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="py-3 px-6 text-lg text-white bg-black transition-colors duration-300 hover:bg-green-400"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload PDF'}
          </button>
          <input
            type="text"
            className={`w-full p-3 border border-gray-300 text-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
          <button
            type="submit"
            className="py-3 px-6 text-lg text-white bg-black rounded-r-lg transition-colors duration-300 hover:bg-green-400"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default PDF;
