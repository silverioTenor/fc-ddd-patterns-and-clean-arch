export interface OutputListCustomerDto {
   id: string;
   name: string;
   active: boolean;
   rewardPoints: number;
   address: {
      street: string;
      number: number;
      city: string;
      state: string;
      country: string;
      postalCode: number;
   };
}
