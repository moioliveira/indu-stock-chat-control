
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Inventory Item type definition
interface InventoryItem {
  name: string;
  quantity: number;
  category: string;
  availability: string;
}

const Index = () => {
  const { toast } = useToast();
  const [stock, setStock] = useState<InventoryItem[]>([
    { name: "Arroz", quantity: 50, category: "Grãos", availability: "Em Estoque" },
    { name: "Frango", quantity: 60, category: "Proteínas", availability: "Em Estoque" },
    { name: "Creme de Leite", quantity: 30, category: "Laticínios", availability: "Em Estoque" },
    { name: "Milho Verde", quantity: 20, category: "Conservas", availability: "Em Estoque" },
    { name: "Extrato de Tomate", quantity: 40, category: "Condimentos", availability: "Em Estoque" }
  ]);
  
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Olá! Sou o InduBot, seu assistente de controle de estoque. Como posso ajudar hoje? 😊", isUser: false }
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
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
  
  const processCommand = (input: string): string => {
    input = input.toLowerCase().trim();
    let response = "Desculpe, não entendi o comando. Tente algo como 'mostrar estoque de arroz' ou 'adicionar 10 frango'. 😊";
  
    // Check stock for a specific item
    if (input.startsWith("mostrar estoque de")) {
      const itemName = input.replace("mostrar estoque de", "").trim();
      const item = stock.find(i => i.name.toLowerCase() === itemName);
      
      if (item) {
        response = `O estoque de ${item.name} é ${item.quantity} unidades. Disponibilidade: ${item.availability}. ✅`;
      } else {
        response = `Item "${itemName}" não encontrado no estoque. 😔`;
      }
    }
    // Show all stock
    else if (input === "mostrar todo o estoque") {
      response = "Estoque atual:\n" + stock.map(i => `${i.name}: ${i.quantity} unidades (${i.category})`).join("\n");
    }
    // Add units to stock
    else if (input.startsWith("adicionar")) {
      const match = input.match(/adicionar (\d+) (.+)/);
      if (match) {
        const quantity = parseInt(match[1]);
        const itemName = match[2].trim();
        
        const updatedStock = [...stock];
        const itemIndex = updatedStock.findIndex(i => i.name.toLowerCase() === itemName);
        
        if (itemIndex !== -1) {
          updatedStock[itemIndex].quantity += quantity;
          updatedStock[itemIndex].availability = updatedStock[itemIndex].quantity > 0 ? "Em Estoque" : "Esgotado";
          setStock(updatedStock);
          response = `${quantity} unidades de ${updatedStock[itemIndex].name} adicionadas! Estoque atual: ${updatedStock[itemIndex].quantity}. ✅`;
        } else {
          response = `Item "${itemName}" não encontrado no estoque. 😔`;
        }
      }
    }
    // Remove units from stock
    else if (input.startsWith("remover")) {
      const match = input.match(/remover (\d+) (.+)/);
      if (match) {
        const quantity = parseInt(match[1]);
        const itemName = match[2].trim();
        
        const updatedStock = [...stock];
        const itemIndex = updatedStock.findIndex(i => i.name.toLowerCase() === itemName);
        
        if (itemIndex !== -1) {
          updatedStock[itemIndex].quantity = Math.max(0, updatedStock[itemIndex].quantity - quantity);
          updatedStock[itemIndex].availability = updatedStock[itemIndex].quantity > 0 ? "Em Estoque" : "Esgotado";
          setStock(updatedStock);
          response = `${quantity} unidades de ${updatedStock[itemIndex].name} removidas! Estoque atual: ${updatedStock[itemIndex].quantity}. ✅`;
        } else {
          response = `Item "${itemName}" não encontrado no estoque. 😔`;
        }
      }
    }
    
    return response;
  };
  
  const exportToCSV = () => {
    const headers = ["Nome do Item", "Quantidade", "Categoria", "Disponibilidade"];
    const rows = stock.map(item => [item.name, item.quantity, item.category, item.availability]);
    let csvContent = headers.join(",") + "\n" + rows.map(row => row.join(",")).join("\n");
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    
    link.setAttribute('href', url);
    link.setAttribute('download', `estoque_industock_${today}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exportação Concluída",
      description: "O relatório de estoque foi exportado com sucesso.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-3 px-4 shadow-md fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Package className="mr-2" />
            <h1 className="text-xl font-bold">InduStock</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-200 font-medium">Home</a>
            <a href="#estoque" className="hover:text-blue-200 font-medium">Estoque</a>
            <Button 
              variant="outline" 
              onClick={exportToCSV} 
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Exportar
            </Button>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto pt-24 pb-10 px-4 flex-grow" id="estoque">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chat Section */}
          <div className="flex flex-col">
            <Card className="shadow-md flex-grow">
              <CardContent className="p-0">
                <div className="py-3 px-4 bg-blue-50 rounded-t-lg border-b">
                  <h2 className="text-lg font-medium text-blue-800 flex items-center">
                    <div className="bg-blue-600 text-white p-1 rounded-full mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </div>
                    InduBot
                  </h2>
                </div>
                
                <div 
                  ref={chatContainerRef}
                  className="p-4 h-[60vh] overflow-y-auto"
                  aria-live="polite"
                  aria-label="Conversa com InduBot"
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
                aria-label="Digite uma mensagem para o InduBot"
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
          
          {/* Stock Table */}
          <div className="flex flex-col">
            <Card className="shadow-md flex-grow">
              <CardContent className="p-0">
                <div className="py-3 px-4 bg-blue-50 rounded-t-lg border-b">
                  <h2 className="text-lg font-medium text-blue-800">Controle de Estoque</h2>
                </div>
                <div className="p-4 h-[65vh] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Nome do Item</TableHead>
                        <TableHead className="font-semibold">Quantidade</TableHead>
                        <TableHead className="font-semibold">Categoria</TableHead>
                        <TableHead className="font-semibold">Disponibilidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stock.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              item.availability === 'Em Estoque' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {item.availability}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              onClick={exportToCSV}
              className="mt-4 md:hidden"
            >
              Exportar Estoque
            </Button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-4">
        <div className="container mx-auto text-center">
          <p>© 2025 InduStock. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
