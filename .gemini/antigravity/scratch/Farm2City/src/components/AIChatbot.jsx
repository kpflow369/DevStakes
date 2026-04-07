import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Farm2City AI assistant. I can help with crop prices, suggestions, or basic help.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't understand that. Try asking about 'prices', 'suggestions', or 'help'.";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('price') || lower.includes('cost')) {
        botResponse = "Current market trends: Tomatoes are ₹20-30/kg, Wheat is ₹2200-2400/quintal, and Mangoes are ₹60-100/kg depending on variety.";
      } else if (lower.includes('suggest') || lower.includes('grow')) {
        botResponse = "Based on the upcoming season, planting Tomatoes and Okra is highly suggested for quick returns.";
      } else if (lower.includes('help')) {
        botResponse = "As a farmer, you can add products from your Dashboard. As a buyer, you can browse the Marketplace and add items to your cart.";
      } else if (lower.includes('hello') || lower.includes('hi')) {
        botResponse = "Hello there! How can I help you today?";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} /> AI Assistant
            </h4>
            <X size={20} cursor="pointer" onClick={() => setIsOpen(false)} />
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-input">
            <input 
              type="text" 
              placeholder="Ask me something..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn" style={{ padding: '8px 12px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <img src="https://api.iconify.design/mdi:robot-outline.svg?color=white" alt="AI" width={32} />
        </div>
      )}
    </div>
  );
}
