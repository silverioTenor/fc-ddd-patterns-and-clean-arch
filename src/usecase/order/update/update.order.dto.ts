export interface InputUpdateOrderDto {
   id: string;
   items: Array<{
      id: string;
      productId: string;
      productName: string;
      quantity: number;
      price: number;
   }>;
}

export interface OutputUpdateOrderDto {
   id: string;
   customerId: string;
   items: Array<{
      id: string;
      producId: string;
      productName: string;
      quantity: number;
      price: number;
   }>;
   total: number;
}
