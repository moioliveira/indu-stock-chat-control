
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { InventoryItem } from "@/hooks/useInventoryState";
import { useChatCommands } from "@/hooks/useChatCommands";

interface ChatInterfaceProps {
  stock: InventoryItem[];
  updateStock: (itemName: string, quantity: number) => void;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ stock, updateStock }) => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: "Olá! Sou o InduBot, seu assistente de controle de estoque. Como posso ajudar hoje? 😊", isUser: false }
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { processCommand } = useChatCommands(stock, updateStock);
  
  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    // Add user message to chat
    const newMessage = { text: userInput, isUser: true };
    setChatMessages(prev => [...prev, newMessage]);
    
    // Process command
    const response = processCommand(userInput);
    
    // Add bot response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 500);
    
    // Clear input
    setUserInput('');
  };

  return (
    <div className="flex flex-col">
      <Card className="shadow-md flex-grow">
        <CardContent className="p-0">
          <div className="py-3 px-4 bg-blue-50 rounded-t-lg border-b">
            <h2 className="text-lg font-medium text-blue-800 flex items-center">
              <div className="bg-blue-600 text-white p-1 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              Assistente IA
            </h2>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="p-4 h-[60vh] overflow-y-auto"
            aria-live="polite"
            aria-label="Conversa com Assistente de IA"
          >
            {chatMessages.map((message, index) => (
              <div 
                key={index} 
                className={`my-2 max-w-[85%] ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
              >
                <div 
                  className={`p-3 rounded-2xl whitespace-pre-wrap ${
                    message.isUser 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 flex">
        <Input
          value={userInput}
          onChange={handleUserInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="rounded-r-none"
          aria-label="Digite uma mensagem para o assistente"
        />
        <Button 
          onClick={handleSendMessage} 
          className="rounded-l-none"
          disabled={!userInput.trim()}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
