export interface InputFindOrderDto {
   id: string;
}

export interface OutputFindOrderDto {
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
