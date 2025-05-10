
import { useState } from 'react';

// Inventory Item type definition
export interface InventoryItem {
  name: string;
  quantity: number;
  category: string;
  availability: string;
}

export const useInventoryState = () => {
  const [stock, setStock] = useState<InventoryItem[]>([
    { name: "Arroz", quantity: 50, category: "Grãos", availability: "Em Estoque" },
    { name: "Frango", quantity: 60, category: "Proteínas", availability: "Em Estoque" },
    { name: "Creme de Leite", quantity: 30, category: "Laticínios", availability: "Em Estoque" },
    { name: "Milho Verde", quantity: 20, category: "Conservas", availability: "Em Estoque" },
    { name: "Extrato de Tomate", quantity: 40, category: "Condimentos", availability: "Em Estoque" }
  ]);
  
  const updateStock = (itemName: string, quantity: number) => {
    setStock(prevStock => {
      const updatedStock = [...prevStock];
      const itemIndex = updatedStock.findIndex(i => i.name.toLowerCase() === itemName.toLowerCase());
      
      if (itemIndex !== -1) {
        updatedStock[itemIndex].quantity = Math.max(0, updatedStock[itemIndex].quantity + quantity);
        updatedStock[itemIndex].availability = updatedStock[itemIndex].quantity > 0 ? "Em Estoque" : "Esgotado";
      }
      
      return updatedStock;
    });
  };

  return { stock, updateStock };
};
