import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import ChatSidebar from './ChatSidebar';
import ChatMessage from './ChatMessage';
import Logo from './Logo';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
  messages: Message[];
}

interface UserProfile {
  name?: string;
  class?: string;
  language?: 'English' | 'Hinglish';
  interests?: string[];
  stream?: string;
  hobbies?: string[];
  subjects?: string[];
  skills?: string[];
}

const WELCOME_MESSAGE = `Hey there! I'm BindaasBhaiya, your friendly AI career counselor! 🎓 

Let's start with something simple - what's your name?`;

export default function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createNewChat = () => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      timestamp: new Date(),
      preview: WELCOME_MESSAGE,
      messages: [{
        id: `msg-${Date.now()}`,
        content: WELCOME_MESSAGE,
        sender: 'bot',
        timestamp: new Date()
      }]
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const simplifyQuestion = (question: string): string => {
    const simplifications: Record<string, string> = {
      'Which class are you currently in?': 'Are you in 9th, 10th, 11th, or 12th class?',
      'What subjects or activities do you enjoy?': 'Tell me one subject that you really like in school.',
      'What aspects interest you the most?': 'What\'s your favorite part about studying these subjects?',
      'Would you prefer to chat in English or Hinglish?': 'Should we talk in English या फिर Hinglish में बात करें?',
      'What are your hobbies?': 'What do you like to do in your free time for fun?',
      'Which stream are you in?': 'Have you chosen Science, Commerce, or Arts?',
    };

    for (const [complex, simple] of Object.entries(simplifications)) {
      if (question.includes(complex)) {
        return simple;
      }
    }

    // If no direct match, make the question more conversational
    return `Let me ask that in a simpler way: ${question.toLowerCase()
      .replace('what', 'tell me')
      .replace('which', 'tell me about')
      .replace('how', 'tell me how')
      .replace('?', '')}?`;
  };

  const generateResponse = (userInput: string, profile: UserProfile): string => {
    const input = userInput.toLowerCase();
    
    if (!profile.name) {
      setUserProfile(prev => ({ ...prev, name: userInput }));
      return `Nice to meet you, ${userInput}! 😊 Would you prefer to chat in English or Hinglish?`;
    }

    if (!profile.language) {
      const language = input.includes('hinglish') ? 'Hinglish' : 'English';
      setUserProfile(prev => ({ ...prev, language }));
      return `Perfect! I'll continue in ${language}. Tell me, which class are you studying in right now?`;
    }

    if (!profile.class) {
      const classYear = input.match(/\d+/)?.[0];
      if (classYear && ['9', '10', '11', '12'].includes(classYear)) {
        setUserProfile(prev => ({ ...prev, class: classYear }));
        if (['11', '12'].includes(classYear)) {
          return "Which stream have you chosen - Science, Commerce, or Arts?";
        }
        return `Tell me about your favorite subject in school. What makes it interesting for you?`;
      }
      return "I didn't catch that. Are you in 9th, 10th, 11th, or 12th class?";
    }

    if (!profile.stream && ['11', '12'].includes(profile.class)) {
      const stream = input.match(/(science|commerce|arts)/i)?.[0];
      if (stream) {
        setUserProfile(prev => ({ ...prev, stream }));
        return `That's great! Tell me one thing you find most interesting about ${stream}?`;
      }
      return "Just to be clear - are you in Science, Commerce, or Arts stream?";
    }

    if (!profile.subjects) {
      setUserProfile(prev => ({
        ...prev,
        subjects: [...(prev.subjects || []), userInput]
      }));
      return "What do you like to do in your free time? Any hobbies or activities you enjoy?";
    }

    if (!profile.hobbies) {
      setUserProfile(prev => ({
        ...prev,
        hobbies: [...(prev.hobbies || []), userInput]
      }));
      return "That's interesting! Tell me, do you prefer working alone or with other people?";
    }

    // After gathering basic information, start exploring specific interests
    if (input.includes('alone') || input.includes('myself')) {
      return "I see you like independent work! Would you enjoy a career where you can focus deeply on tasks by yourself?";
    }

    if (input.includes('people') || input.includes('team') || input.includes('group')) {
      return "Working with people can be great! Would you like to know about careers where you can help and interact with others?";
    }

    if (input.includes('yes') || input.includes('sure')) {
      return generateCareerSuggestions(profile);
    }

    // Default response
    return "I want to understand your interests better. Tell me more about what you enjoy doing, whether in studies or outside?";
  };

  const generateCareerSuggestions = (profile: UserProfile): string => {
    const suggestions = {
      science: {
        math: [
          "• Data Science - Using math to solve real-world problems",
          "• Software Engineering - Creating apps and websites",
          "• Financial Analysis - Working with numbers and markets"
        ],
        biology: [
          "• Medicine - Helping people stay healthy",
          "• Biotechnology - Working with living things",
          "• Environmental Science - Protecting nature"
        ],
        physics: [
          "• Engineering - Building and designing things",
          "• Robotics - Working with robots and AI",
          "• Research - Discovering new things"
        ]
      },
      commerce: [
        "• Chartered Accountancy - Managing money and accounts",
        "• Business Management - Running companies",
        "• Digital Marketing - Promoting products online",
        "• Entrepreneurship - Starting your own business"
      ],
      arts: [
        "• Content Creation - Making videos and writing",
        "• Psychology - Understanding how people think",
        "• Design - Creating beautiful things",
        "• Teaching - Helping others learn"
      ]
    };

    let response = "Based on what you've told me, here are some careers you might enjoy:\n\n";

    if (profile.stream) {
      if (profile.stream === 'science') {
        const subject = profile.subjects?.[0]?.toLowerCase() || '';
        if (subject.includes('math')) {
          response += suggestions.science.math.join('\n');
        } else if (subject.includes('bio')) {
          response += suggestions.science.biology.join('\n');
        } else {
          response += suggestions.science.physics.join('\n');
        }
      } else if (profile.stream === 'commerce') {
        response += suggestions.commerce.join('\n');
      } else {
        response += suggestions.arts.join('\n');
      }
    } else {
      response += "Let me know which of these areas interest you:\n\n";
      response += "1. Working with technology and computers\n";
      response += "2. Helping and teaching others\n";
      response += "3. Creating and designing things\n";
      response += "4. Solving problems and puzzles\n";
    }

    return response + "\n\nWould you like to know more about any of these options?";
  };

  const handleSend = async () => {
    if (!input.trim() || !activeConversationId) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          preview: input,
          messages: [...conv.messages, userMessage]
        };
      }
      return conv;
    }));

    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        content: generateResponse(input, userProfile),
        sender: 'bot',
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            preview: botResponse.content,
            messages: [...conv.messages, botResponse]
          };
        }
        return conv;
      }));

      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (conversations.length === 0) {
      createNewChat();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#0A0F1C] relative">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-radial from-teal-500/10 via-transparent to-transparent"></div>
      
      <ChatSidebar 
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={createNewChat}
        onSelectConversation={setActiveConversationId}
        onDeleteConversation={(id) => {
          setConversations(prev => prev.filter(conv => conv.id !== id));
          if (activeConversationId === id) {
            setActiveConversationId(conversations[0]?.id);
          }
        }}
        onEditConversation={(id) => {
          const newTitle = prompt('Enter new conversation title:');
          if (newTitle) {
            setConversations(prev => prev.map(conv => 
              conv.id === id ? { ...conv, title: newTitle } : conv
            ));
          }
        }}
      />
      
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              sender={message.sender}
              onRedefine={() => {
                if (message.sender === 'bot') {
                  setIsTyping(true);
                  setTimeout(() => {
                    const simplifiedContent = simplifyQuestion(message.content);
                    setConversations(prev => prev.map(conv => {
                      if (conv.id === activeConversationId) {
                        return {
                          ...conv,
                          messages: [...conv.messages, {
                            id: `msg-${Date.now()}`,
                            content: simplifiedContent,
                            sender: 'bot',
                            timestamp: new Date()
                          }]
                        };
                      }
                      return conv;
                    }));
                    setIsTyping(false);
                  }, 1000);
                }
              }}
            />
          ))}
          
          {isTyping && (
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                <Logo className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/10 p-4 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] to-transparent opacity-80"></div>
          <div className="max-w-4xl mx-auto relative">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message BindaasBhaiya..."
                className="w-full p-4 pr-24 bg-surface text-white rounded-xl border border-white/10 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-20 transition-all duration-200 shadow-lg"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-teal-500 transition-colors">
                  <Sparkles className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSend}
                  className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-lg group-focus-within:animate-pulse"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}