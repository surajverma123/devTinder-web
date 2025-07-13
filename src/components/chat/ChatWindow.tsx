import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Minimize2,
  Maximize2,
  Heart,
  Image,
  Mic,
  MicOff
} from 'lucide-react';
import { User } from '../../types';
import Button from '../common/Button';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'voice';
  status: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  user: User;
  onClose: () => void;
  currentUserId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, onClose, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: user.id,
      content: 'Hi! Thanks for connecting with me. How are you doing today?',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: currentUserId,
      content: 'Hello! I\'m doing great, thank you for asking. I really enjoyed reading your profile.',
      timestamp: new Date(Date.now() - 3000000),
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: user.id,
      content: 'That\'s wonderful! I\'d love to know more about your interests. What do you enjoy doing in your free time?',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      senderId: currentUserId,
      content: 'I love hiking and photography. There\'s something magical about capturing beautiful moments in nature.',
      timestamp: new Date(Date.now() - 900000),
      type: 'text',
      status: 'delivered'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when chat opens
    if (!isMinimized) {
      inputRef.current?.focus();
    }
  }, [isMinimized]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        content: newMessage.trim(),
        timestamp: new Date(),
        type: 'text',
        status: 'sent'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response (in real app, this would be real-time)
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: user.id,
          content: 'That sounds amazing! I\'d love to hear more about it.',
          timestamp: new Date(),
          type: 'text',
          status: 'sent'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <div className="w-3 h-3 border border-gray-400 rounded-full"></div>;
      case 'delivered':
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
      case 'read':
        return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  // Chat window dimensions based on state
  const getChatDimensions = () => {
    if (isMinimized) {
      return 'w-80 h-14';
    } else if (isMaximized) {
      return 'w-[600px] h-[700px]';
    } else {
      return 'w-96 h-[500px]';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 z-50 ${getChatDimensions()}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E2A49] to-[#2a3c69] text-white p-3 flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center flex-1">
          <div className="relative mr-3">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
            {user.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{user.name}</h3>
            <p className="text-white/80 text-xs truncate">
              {user.isOnline ? 'Online now' : `Last seen ${user.lastSeen}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {!isMinimized && (
            <>
              <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <Phone size={16} />
              </button>
              <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <Video size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                }}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages Area - Only show when not minimized */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUserId;
              const showDate = index === 0 || 
                formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
              
              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="text-center my-3">
                      <span className="bg-white px-2 py-1 rounded-full text-xs text-gray-500 shadow-sm">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                      {!isCurrentUser && (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-6 h-6 rounded-full mb-1"
                        />
                      )}
                      
                      <div
                        className={`px-3 py-2 rounded-2xl shadow-sm text-sm ${
                          isCurrentUser
                            ? 'bg-[#1E2A49] text-white rounded-br-md'
                            : 'bg-white text-gray-800 rounded-bl-md border'
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                      </div>
                      
                      <div className={`flex items-center mt-1 space-x-1 ${
                        isCurrentUser ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                        {isCurrentUser && (
                          <div className="ml-1">
                            {getMessageStatusIcon(message.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-md border shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-3">
            <div className="flex items-end space-x-2">
              <button className="p-2 text-gray-500 hover:text-[#1E2A49] transition-colors">
                <Paperclip size={18} />
              </button>
              
              <button className="p-2 text-gray-500 hover:text-[#1E2A49] transition-colors">
                <Image size={18} />
              </button>
              
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent text-sm"
                />
                
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-[#1E2A49] transition-colors">
                  <Smile size={16} />
                </button>
              </div>
              
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 transition-colors ${
                  isRecording 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-500 hover:text-[#1E2A49]'
                }`}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-[#1E2A49] hover:bg-[#2a3c69] disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full"
                icon={<Send size={16} />}
              >
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;