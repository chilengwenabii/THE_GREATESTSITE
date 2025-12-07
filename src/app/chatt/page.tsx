'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
}

interface Message {
  id: string;
  text: string;
  sender: User;
  timestamp: Date;
  file?: {
    name: string;
    url: string;
    type: string;
  };
}

export default function ChattPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock other user
  const otherUser: User = {
    id: 2,
    username: 'team_member',
    full_name: 'Team Member',
    email: 'member@company.com'
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    // Fetch user data
    fetch('http://localhost:8000/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));

      // Initialize with some sample messages
      const initialMessages: Message[] = [
        {
          id: '1',
          text: 'Hey there! Welcome to our private chat.',
          sender: otherUser,
          timestamp: new Date(Date.now() - 300000)
        },
        {
          id: '2',
          text: 'Thanks! Looking forward to chatting.',
          sender: data,
          timestamp: new Date(Date.now() - 240000)
        },
        {
          id: '3',
          text: 'How can I help you today?',
          sender: otherUser,
          timestamp: new Date(Date.now() - 180000)
        }
      ];
      setMessages(initialMessages);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching user:', err);
      setLoading(false);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if ((newMessage.trim() || selectedFile) && user) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage || (selectedFile ? `Sent file: ${selectedFile.name}` : ''),
        sender: user,
        timestamp: new Date()
      };
      if (selectedFile) {
        const fileUrl = URL.createObjectURL(selectedFile);
        message.file = {
          name: selectedFile.name,
          url: fileUrl,
          type: selectedFile.type
        };
      }
      setMessages([...messages, message]);
      setNewMessage('');
      setSelectedFile(null);

      // Simulate a response after 1-2 seconds
      setTimeout(() => {
        const responses = [
          'Got it! Thanks for your message.',
          'That sounds interesting!',
          'I understand. Let me help you with that.',
          'Great point!',
          'Thanks for sharing that information.',
          'I\'ll look into that for you.',
          'Perfect! Let me know if you need anything else.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: otherUser,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, responseMessage]);
      }, Math.random() * 1000 + 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background-main)] flex items-center justify-center">
        <div className="text-[var(--text-primary)] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-main)] text-[var(--text-primary)] flex flex-col">
      {/* Header - Same as Home Page */}
      <header className="bg-[var(--background-header)] backdrop-blur-md p-2 sm:p-4 border-b border-[var(--brand-medium-green)] shadow-[var(--shadow-header)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <img src="/logos/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-lg sm:text-2xl font-bold text-[var(--brand-gold)]">THE GREATEST</h1>
          </div>

          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => router.push('/home')}
              className="text-white hover:text-[var(--brand-gold)] transition text-sm"
            >
              Home
            </button>
            <button
              onClick={() => router.push('/projects')}
              className="text-white hover:text-[var(--brand-gold)] transition text-sm"
            >
              Projects
            </button>
            <button
              onClick={() => router.push('/team')}
              className="text-white hover:text-[var(--brand-gold)] transition text-sm"
            >
              Team
            </button>
            <button
              onClick={() => router.push('/announcements')}
              className="text-white hover:text-[var(--brand-gold)] transition text-sm"
            >
              Announcements
            </button>
            <button
              onClick={() => router.push('/calendar')}
              className="text-white hover:text-[var(--brand-gold)] transition text-sm"
            >
              Calendar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-[var(--brand-gold)] transition"
            onClick={() => router.push('/profile')}
          >
            <img
              src="/images/userpofile.png"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--background-header)] border-b border-[var(--brand-medium-green)]">
          <nav className="flex flex-col space-y-2 p-4">
            <button
              onClick={() => {
                router.push('/home');
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:text-[var(--brand-gold)] transition text-left py-2"
            >
              Home
            </button>
            <button
              onClick={() => {
                router.push('/projects');
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:text-[var(--brand-gold)] transition text-left py-2"
            >
              Projects
            </button>
            <button
              onClick={() => {
                router.push('/team');
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:text-[var(--brand-gold)] transition text-left py-2"
            >
              Team
            </button>
            <button
              onClick={() => {
                router.push('/announcements');
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:text-[var(--brand-gold)] transition text-left py-2"
            >
              Announcements
            </button>
            <button
              onClick={() => {
                router.push('/calendar');
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:text-[var(--brand-gold)] transition text-left py-2"
            >
              Calendar
            </button>
          </nav>
        </div>
      )}

      {/* Chat Header */}
      <div className="bg-[#202c33] p-3 sm:p-4 border-b border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base">T</span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm sm:text-base">{otherUser.full_name}</h2>
            <p className="text-xs sm:text-sm text-gray-400">online</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-[#0a0a0a] p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = user && message.sender.id === user.id;
          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} items-end space-x-2`}
            >
              {!isCurrentUser && (
                <img
                  src="/images/userpofile.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isCurrentUser
                    ? 'bg-[#005c4b] text-white rounded-br-sm'
                    : 'bg-[#202c33] text-white rounded-bl-sm'
                }`}
              >
                {message.file && (
                  <div className="mb-2">
                    {message.file.type.startsWith('image/') ? (
                      <img src={message.file.url} alt={message.file.name} className="max-w-full h-auto rounded" />
                    ) : (
                      <a href={message.file.url} download={message.file.name} className="text-blue-400 underline">
                        📎 {message.file.name}
                      </a>
                    )}
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  isCurrentUser ? 'text-gray-300' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {isCurrentUser && (
                <img
                  src="/images/userpofile.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-[#202c33] p-3 sm:p-4 flex items-center space-x-2 sm:space-x-4">
        <button onClick={handleAttachmentClick} className="text-[#00a884] hover:text-[#00d4aa] transition flex-shrink-0">
          <img src="/images/files.png" alt="Attach file" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="flex-1 flex items-center bg-[#2a3942] rounded-full px-3 sm:px-4 py-2 min-w-0">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm sm:text-base min-w-0"
          />
          <button className="text-[#00a884] hover:text-[#00d4aa] transition ml-1 sm:ml-2 flex-shrink-0">
            😀
          </button>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() && !selectedFile}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition flex-shrink-0 ${
            (newMessage.trim() || selectedFile)
              ? 'bg-[#00a884] hover:bg-[#00d4aa] text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          ➤
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}
