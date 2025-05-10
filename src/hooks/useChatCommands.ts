
import { InventoryItem } from "./useInventoryState";

export const useChatCommands = (
  stock: InventoryItem[], 
  updateStock: (itemName: string, quantity: number) => void
) => {
  
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
        
        const itemIndex = stock.findIndex(i => i.name.toLowerCase() === itemName);
        
        if (itemIndex !== -1) {
          updateStock(itemName, quantity);
          response = `${quantity} unidades de ${stock[itemIndex].name} adicionadas! Estoque atual: ${stock[itemIndex].quantity + quantity}. ✅`;
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
        
        const itemIndex = stock.findIndex(i => i.name.toLowerCase() === itemName);
        
        if (itemIndex !== -1) {
          updateStock(itemName, -quantity);
          const newQuantity = Math.max(0, stock[itemIndex].quantity - quantity);
          response = `${quantity} unidades de ${stock[itemIndex].name} removidas! Estoque atual: ${newQuantity}. ✅`;
        } else {
          response = `Item "${itemName}" não encontrado no estoque. 😔`;
        }
      }
    }
    
    return response;
  };
  
  return { processCommand };
};
