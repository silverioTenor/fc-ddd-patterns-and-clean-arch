import { v4 as uuid } from 'uuid';

export const customerSeed = {
   id: uuid(),
   type: 'pf',
   name: 'Willy Wonka',
   points: 5,
   address: {
      street: 'Rua das Oliveiras',
      number: 50,
      city: 'Cidade Bela',
      state: 'Rio Bonito',
      country: 'Brasil',
      postalCode: 12345678,
   },
};

export const productSeed = {
   id: uuid(),
   type: 'A',
   name: 'Product XPTO',
   price: 129.9,
};

export const orderSeed = {
   id: uuid(),
   customerId: customerSeed.id,
   items: [
      {
         id: uuid(),
         productId: productSeed.id,
         productName: productSeed.name,
         quantity: 2,
         price: productSeed.price,
      },
   ],
   total: 259.8,
};
