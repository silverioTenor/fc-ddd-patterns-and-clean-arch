export interface OutputListOrderDto {
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
