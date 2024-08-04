// import React from 'react';
// import { useSpring, animated } from '@react-spring/web';
// import TWO from '../pages/vedios/TWO.mp4'; // Import the background video

// const videoStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   zIndex: -1,
// };

// const contentStyle = {
//   position: 'relative',
//   zIndex: 1,
//   color: '#fff',
//   padding: '20px',
//   textAlign: 'center', // Center align the text
// };

// const h1Style = {
//   fontSize: '4rem', // Adjust font size
//   fontWeight: 'bold', // Make the text bold
//   lineHeight: '1.2', // Adjust line height for better readability
//   marginBottom: '20px', // Space below the heading
//   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add shadow
// };

// function Home() {
//   // Call the useSpring hook inside the component function
//   const animatedTextStyle = useSpring({
//     from: { opacity: 0, transform: 'translateY(-20px)' },
//     to: { opacity: 1, transform: 'translateY(0)' },
//     config: { duration: 1500 },
//   });

//   return (
//     <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
//       <video style={videoStyle} autoPlay loop muted>
//         <source src={TWO} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       <div style={contentStyle}>
//         <animated.h1 style={{ ...animatedTextStyle, ...h1Style }}>
//           {/* Welcome to the world's first AI Chatbots HUB */}
//         </animated.h1>
//       </div>
//     </div>
//   );
// }

// export default Home;



// import React from 'react';
// import { useSpring, animated } from '@react-spring/web';
// import TWO from '../pages/vedios/TWO.mp4'; // Import the background video

// const videoStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   zIndex: -1,
// };

// const contentStyle = {
//   position: 'relative',
//   zIndex: 1,
//   color: '#fff',
//   padding: '20px',
//   textAlign: 'center', // Center align the text
// };

// const h1Style = {
//   fontSize: '4rem', // Adjust font size
//   fontWeight: 'bold', // Make the text bold
//   lineHeight: '1.2', // Adjust line height for better readability
//   marginBottom: '20px', // Space below the heading
//   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add shadow
// };

// function Home() {
//   const username = localStorage.getItem('username') || 'Guest';

//   // Call the useSpring hook inside the component function
//   const animatedTextStyle = useSpring({
//     from: { opacity: 0, transform: 'translateY(-20px)' },
//     to: { opacity: 1, transform: 'translateY(0)' },
//     config: { duration: 1500 },
//   });

//   return (
//     <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
//       <video style={videoStyle} autoPlay loop muted>
//         <source src={TWO} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       <div style={contentStyle}>
//         <animated.h1 style={{ ...animatedTextStyle, ...h1Style }}>
//           Welcome back, {username} to the AI Chatbots HUB
//         </animated.h1>
//       </div>
//     </div>
//   );
// }

// export default Home;



import React, { useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { AuthContext } from '../context/AuthContext';
import TWO from '../pages/vedios/TWO.mp4'; // Import the background video

const videoStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
};

const contentStyle = {
  position: 'relative',
  zIndex: 1,
  color: '#fff',
  padding: '20px',
  textAlign: 'center', // Center align the text
};

const h1Style = {
  fontSize: '4rem', // Adjust font size
  fontWeight: 'bold', // Make the text bold
  lineHeight: '1.2', // Adjust line height for better readability
  marginBottom: '20px', // Space below the heading
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add shadow
};

function Home() {
  const { username } = useContext(AuthContext);

  // Call the useSpring hook inside the component function
  const animatedTextStyle = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1500 },
  });

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <video style={videoStyle} autoPlay loop muted>
        <source src={TWO} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={contentStyle}>
        <animated.h1 style={{ ...animatedTextStyle, ...h1Style }}>
          Welcome back, {username || 'Guest'} to the AI Chatbots HUB
        </animated.h1>
      </div>
    </div>
  );
}

export default Home;
