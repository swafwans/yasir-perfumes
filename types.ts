
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  notes: {
    top: string;
    middle: string;
    base: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
