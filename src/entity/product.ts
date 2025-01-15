import validate from 'uuid-validate';
import 'dotenv/config';

export default class Product {
   constructor(
      private id: string,
      private name: string,
      private price: number,
   ) {
      this.validate();
   }

   validate() {
      if (this.id.length === 0 || validate.version(this.id) !== Number(process.env.UUID_VERSION)) {
         throw new Error('ID is required and must be a valid UUID');
      } else if (this.name.length === 0) {
         throw new Error('Name is required');
      } else if (this.price <= 0) {
         throw new Error('Price must be greater than zero');
      }
   }

   changePrice(price: number) {
      this.price = price;
      this.validate();
   }

   toString() {
      return `${this.id} - ${this.name} - ${this.price}`;
   }
}
