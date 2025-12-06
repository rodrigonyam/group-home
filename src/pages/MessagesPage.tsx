import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  HomeIcon,
  PhotoIcon,
  PhoneIcon,
  VideoCameraIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isFromUser: boolean;
  type: 'text' | 'image';
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
  lastMessage?: string;
  lastSeen: Date;
  unreadCount: number;
  isOnline: boolean;
}

const MessagesPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'sarah',
      senderName: 'Sarah Johnson',
      content: 'Hi Mom! How was your morning exercise class?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isFromUser: false,
      type: 'text',
    },
    {
      id: '2',
      senderId: 'user',
      senderName: 'You',
      content: 'It was wonderful! We did gentle stretching and I made a new friend named Betty.',
      timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      isFromUser: true,
      type: 'text',
    },
    {
      id: '3',
      senderId: 'sarah',
      senderName: 'Sarah Johnson',
      content: 'That\'s fantastic! I\'m so happy to hear that. Can\'t wait to visit this weekend!',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      isFromUser: false,
      type: 'text',
    },
  ]);

  const contacts: Contact[] = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      lastMessage: 'That\'s fantastic! I\'m so happy...',
      lastSeen: new Date(Date.now() - 10 * 60 * 1000),
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: 'mike',
      name: 'Mike Johnson',
      relationship: 'Son',
      lastMessage: 'See you tomorrow for lunch!',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      unreadCount: 2,
      isOnline: false,
    },
    {
      id: 'emily',
      name: 'Emily Roberts',
      relationship: 'Granddaughter',
      lastMessage: 'Love you grandma! ❤️',
      lastSeen: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      unreadCount: 1,
      isOnline: false,
    },
    {
      id: 'nurse-mary',
      name: 'Nurse Mary',
      relationship: 'Staff',
      lastMessage: 'Your medication schedule has been updated',
      lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      unreadCount: 0,
      isOnline: true,
    },
  ];

  const selectedContactData = contacts.find(c => c.id === selectedContact);
  const contactMessages = selectedContact 
    ? messages.filter(m => m.senderId === selectedContact || m.isFromUser)
    : [];

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date(),
      isFromUser: true,
      type: 'text',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        'Thanks for letting me know!',
        'That sounds wonderful!',
        'I love you too!',
        'See you soon!',
        'Take care of yourself!',
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedContact,
        senderName: selectedContactData?.name || 'Contact',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isFromUser: false,
        type: 'text',
      };
      
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-3 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-200 transition-colors"
          >
            <HomeIcon className="h-8 w-8" />
          </Link>
          <div>
            <h1 className="text-3xl-senior font-bold text-gray-900 flex items-center">
              <ChatBubbleLeftRightIcon className="h-10 w-10 mr-3 text-blue-600" />
              Messages
            </h1>
            {selectedContactData && (
              <p className="text-lg-senior text-gray-600">
                Chatting with {selectedContactData.name}
              </p>
            )}
          </div>
        </div>

        {selectedContactData && (
          <div className="flex items-center space-x-3">
            <button className="p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors">
              <PhoneIcon className="h-6 w-6" />
            </button>
            <Link 
              to="/call"
              className="p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors"
            >
              <VideoCameraIcon className="h-6 w-6" />
            </Link>
          </div>
        )}
      </div>

      <div className="flex-1 flex">
        {/* Contacts List */}
        <div className="w-1/3 border-r border-gray-200 bg-gray-50">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl-senior font-semibold text-gray-900">
              Contacts
            </h2>
          </div>
          
          <div className="overflow-y-auto">
            {contacts.map((contact) => (
              <motion.button
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 text-left border-b border-gray-200 transition-colors ${
                  selectedContact === contact.id
                    ? 'bg-blue-100 border-l-4 border-l-blue-500'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <UserCircleIcon className="h-12 w-12 text-gray-400" />
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg-senior font-medium text-gray-900 truncate">
                        {contact.name}
                      </h3>
                      {contact.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm-senior text-gray-500">
                      {contact.relationship}
                    </p>
                    {contact.lastMessage && (
                      <p className="text-sm-senior text-gray-600 truncate mt-1">
                        {contact.lastMessage}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {format(contact.lastSeen, 'h:mm a')}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {contactMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl ${
                        message.isFromUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-lg-senior">{message.content}</p>
                      <p className={`text-sm mt-2 ${
                        message.isFromUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {format(message.timestamp, 'h:mm a')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-4">
                  <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                    <PhotoIcon className="h-6 w-6" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full p-4 text-lg-senior border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                  
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <PaperAirplaneIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mt-3 text-center">
                  <p className="text-sm-senior text-gray-500">
                    Press Enter to send • Shift + Enter for new line
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <ChatBubbleLeftRightIcon className="h-24 w-24 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl-senior font-medium text-gray-900 mb-3">
                  Select a Contact
                </h3>
                <p className="text-lg-senior text-gray-600 mb-8">
                  Choose someone from your contacts to start chatting
                </p>
                <Link to="/" className="btn-primary inline-flex items-center">
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;