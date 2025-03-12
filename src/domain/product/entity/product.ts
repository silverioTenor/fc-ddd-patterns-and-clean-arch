import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate';
import 'dotenv/config';
import IProduct from './product.interface';

export default class Product implements IProduct {
   private id: string;

   constructor(
      private name: string,
      private price: number,
      id?: string,
   ) {
      this.id = !!id ? id : uuid();
      this.validate();
   }

   getId() {
      return this.id;
   }

   getName() {
      return this.name;
   }

   getPrice() {
      return this.price;
   }

   validate() {
      if (this.id.length === 0 || validate.version(this.id) !== 4) {
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
