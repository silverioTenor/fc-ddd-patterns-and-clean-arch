import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate';
import 'dotenv/config';
import HttpValidation from '@infra/@Shared/api/error/http.validation.error';

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
      if (!(!!this.id) || validate.version(this.id) !== 4) {
         throw new HttpValidation('ID is required!');
      } else if (!(!!this.productId) || validate.version(this.productId) !== 4) {
         throw new HttpValidation('Product ID is required!');
      } else if (!(!!this.productName)) {
         throw new HttpValidation('Product name is required!');
      } else if (!(!!this.quantity) || this.quantity <= 0) {
         throw new HttpValidation('Quantity must be greater than zero!');
      } else if (!(!!this.price) || this.price <= 0) {
         throw new HttpValidation('Price is required!');
      }
   }

   orderItemTotal() {
      return this.quantity * this.price;
   }

   toString() {
      return `${this.productName} - ${this.quantity} x ${this.price}`;
   }
}
