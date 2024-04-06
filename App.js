import React from 'react';
import Chatbot from './Chatbot';
import logo from './logo.png'; // Import your logo file


/* App.js*/

function App() {
  return (
    <div >
    <h1 style={{ textAlign: 'center'}}>IRIS</h1>
    
    <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <Chatbot />
    </div>
  );
}
export default App;