export interface InputUpdateCustomerDto {
   id: string;
   name: string;
   type: string;
}

export interface InputUpdateAddressDto {
   id: string;
   type: string;
   address: {
      street: string;
      number: number;
      city: string;
      state: string;
      country: string;
      postalCode: number;
   };
}
