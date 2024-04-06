import React, { useState, useEffect } from 'react';
import './Chat.css';


const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const storedHistory = JSON.parse(localStorage.getItem('history') || '[]');
    return storedHistory;
  });
  const [showHistory, setShowHistory] = useState(false);

  const generateRandomReply = () => {
    const randomReplies = [
      "I'm sorry, I didn't quite catch that.",
      "Could you please repeat that?",
      "Interesting, tell me more!",
      "That's fascinating!",
      "I'm not sure I understand. Can you provide more context?",
      "Let me think about that for a moment...",
      "Hmm, I'm not sure what to say.",
      "Great question! Let me look that up for you.",
      "I'm here to assist you!",
    ];
    const randomIndex = Math.floor(Math.random() * randomReplies.length);
    return randomReplies[randomIndex];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { text: input, user: true, timestamp: new Date() };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    const reply = generateRandomReply();
    const botMessage = { text: reply, user: false, timestamp: new Date() };
    setMessages(prevMessages => [...prevMessages, botMessage]);

    setInput('');
  };

  useEffect(() => {
    const handleLocalStorage = () => {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage) return;
      const currentTime = new Date();
      const diffInMinutes = (currentTime - new Date(lastMessage.timestamp)) / (1000 * 60);

      if (diffInMinutes > 30) {
        localStorage.setItem('history', JSON.stringify(messages));
      }
    };

    handleLocalStorage();
  }, [messages]);

  return (
    <div className="chat-page">

      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? 'Hide Chat History' : 'Show Chat History'}
      </button>
      
      {showHistory && (
        <div className="history-container">
          <div className="history">
            <h2>Chat History</h2>
            {JSON.parse(localStorage.getItem('history') || '[]').map((message, index) => (
              <div key={index} className={`message ${message.user ? 'user' : 'bot'}`}>
                {message.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.user ? 'user' : 'bot'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
