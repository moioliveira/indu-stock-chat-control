
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InventoryItem } from "@/hooks/useInventoryState";

interface StockTableProps {
  stock: InventoryItem[];
  exportToCSV: () => void;
}

const StockTable: React.FC<StockTableProps> = ({ stock, exportToCSV }) => {
  return (
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
  );
};

export default StockTable;
