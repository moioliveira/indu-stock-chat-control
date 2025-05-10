
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database } from "lucide-react";
import StockTable from "@/components/stock/StockTable";
import ChatInterface from "@/components/chat/ChatInterface";
import { useInventoryState } from "@/hooks/useInventoryState";

const Estoque = () => {
  const { toast } = useToast();
  const { stock, updateStock } = useInventoryState();
  
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
    link.setAttribute('download', `estoque_estoquei_${today}.csv`);
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
            <Database className="mr-2" />
            <h1 className="text-xl font-bold">eStoquei</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 font-medium">Home</Link>
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
          <ChatInterface stock={stock} updateStock={updateStock} />
          
          {/* Stock Table */}
          <StockTable stock={stock} exportToCSV={exportToCSV} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-4">
        <div className="container mx-auto text-center">
          <p>© 2025 eStoquei. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Estoque;
