import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate';
import 'dotenv/config';

export default class OrderItem {
   private id: string;

   constructor(
      private productId: string,
      private productName: string,
      private quantity: number,
      private price: number,
      id?: string,
   ) {
      this.id = !!id ? id : uuid();
      this.validate();
   }

   getId() {
      return this.id;
   }

   getProductId() {
      return this.productId;
   }

   getProductName() {
      return this.productName;
   }

   getQuantity() {
      return this.quantity;
   }

   getPrice() {
      return this.price;
   }

   validate() {
      if (this.id.length === 0 || validate.version(this.id) !== 4) {
         throw new Error('ID is required!');
      } else if (this.productId.length === 0 || validate.version(this.productId) !== 4) {
         throw new Error('Product ID is required!');
      } else if (this.productName.length === 0) {
         throw new Error('Product name is required!');
      } else if (this.quantity <= 0) {
         throw new Error('Quantity must be greater than zero!');
      } else if (this.price <= 0) {
         throw new Error('Price is required!');
      }
   }

   orderItemTotal() {
      return this.quantity * this.price;
   }

   toString() {
      return `${this.productName} - ${this.quantity} x ${this.price}`;
   }
}
