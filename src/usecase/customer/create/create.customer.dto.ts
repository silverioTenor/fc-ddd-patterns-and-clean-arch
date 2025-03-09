export interface InputCreateCustomerDto {
   name: string;
   address: {
      street: string;
      number: number;
      city: string;
      state: string;
      country: string;
      postalCode: number;
   };
   type: string;
}

// export interface OutputCreateCustomerDto {
//    id: string;
//    name: string;
//    rewardPoints: number;
//    active: boolean;
//    address: {
//       street: string;
//       number: number;
//       city: string;
//       state: string;
//       country: string;
//       postalCode: number;
//    };
// }
