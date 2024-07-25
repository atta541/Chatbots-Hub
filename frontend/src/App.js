import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Chatbot from './pages/LeftSidebar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/chatbots" element={<PrivateRoute><Chatbot /></PrivateRoute>} />


          {/* un comment below line to off the Login functionallity */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/chatbots" element={<Chatbot/>}/> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



