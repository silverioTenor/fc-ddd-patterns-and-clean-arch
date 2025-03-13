export interface InputUpdateOrderDto {
   id: string;
   products: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
   }>;
}

export interface OutputUpdateOrderDto {
   id: string;
   customerId: string;
   products: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
   }>;
   total: number;
}
