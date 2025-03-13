export interface IOrderPayload {
   orderId?: string;
   orderItemId?: string;
   customerId: string;
   products: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
   }>;
}
