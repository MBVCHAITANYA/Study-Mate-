import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2, Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  uploadedFiles: any[];
}

export const ChatInterface = ({ uploadedFiles }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm StudyMate AI. I've analyzed your uploaded documents and I'm ready to help you learn. Ask me anything about your study materials!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Summarize the main concepts from this document",
    "What are the key formulas I should remember?",
    "Explain this topic in simple terms",
    "Create a study plan from this material",
    "What are the most important points to review?"
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    // Add typing indicator
    const typingMessage: Message = {
      id: Date.now().toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingMessage]);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Remove typing indicator and add actual response
    setMessages(prev => prev.filter(m => !m.isTyping));

    const responses = [
      "Based on your uploaded documents, I can see that this topic involves several key concepts. Let me break them down for you in a clear, structured way...",
      "Great question! From the materials you've provided, I found relevant information that directly addresses this. Here's what I discovered...",
      "I've analyzed the content in your PDFs and found some interesting insights about this topic. The main points include...",
      "Excellent question! This is a fundamental concept covered in your study materials. Let me explain it step by step...",
      "I can help you understand this better by connecting it to the examples and explanations in your uploaded documents..."
    ];

    const aiResponse: Message = {
      id: Date.now().toString(),
      content: responses[Math.floor(Math.random() * responses.length)],
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    await simulateAIResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 ai-gradient rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">StudyMate AI</h3>
            <p className="text-sm text-muted-foreground">
              {uploadedFiles.length > 0 
                ? `Analyzing ${uploadedFiles.length} document${uploadedFiles.length > 1 ? 's' : ''}`
                : 'Ready to help you learn'
              }
            </p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded-full text-xs">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    {message.isTyping ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                )}

                <Card className={`max-w-[80%] p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  {message.isTyping ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Thinking</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                </Card>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-border">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            Suggested Questions
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start text-left h-auto p-2 text-xs"
                onClick={() => handleSuggestedQuestion(question)}
              >
                <Sparkles className="w-3 h-3 mr-2 text-accent flex-shrink-0" />
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your study materials..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            variant="ai"
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};