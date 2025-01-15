import validate from 'uuid-validate';
import 'dotenv/config';

export default class OrderItem {
   constructor(
      public readonly id: string,
      public readonly productId: string,
      public readonly productName: string,
      public readonly quantity: number,
      public readonly price: number,
   ) {
      this.validate();
   }

   validate() {
      if (this.id.length === 0 || validate.version(this.id) !== Number(process.env.UUID_VERSION)) {
         throw new Error('ID is required!');
      } else if (
         this.productId.length === 0 ||
         validate.version(this.productId) !== Number(process.env.UUID_VERSION)
      ) {
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
