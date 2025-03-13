export interface InputCreateOrderDto {
   customerId: string;
   products: Array<{
      productId: string;
      productName: string;
      quantity: number;
      price: number;
   }>;
}

export interface OutputCreateOrderDto {
   id: string;
   customerId: string;
   items: Array<{
      id: string;
      productId: string;
      productName: string;
      quantity: number;
      price: number;
   }>;
}
