import validate from 'uuid-validate';
import 'dotenv/config';

export default class OrderItem {
   constructor(
      private _id: string,
      private _productId: string,
      private _productName: string,
      private _quantity: number,
      private _price: number,
   ) {
      this.validate();
   }

   get id() {
      return this._id;
   }

   get productId() {
      return this._productId;
   }

   get productName() {
      return this._productName;
   }

   get quantity() {
      return this._quantity;
   }

   get price() {
      return this._price;
   }

   validate() {
      if (this._id.length === 0 || validate.version(this._id) !== 4) {
         throw new Error('ID is required!');
      } else if (this._productId.length === 0 || validate.version(this._productId) !== 4) {
         throw new Error('Product ID is required!');
      } else if (this._productName.length === 0) {
         throw new Error('Product name is required!');
      } else if (this._quantity <= 0) {
         throw new Error('Quantity must be greater than zero!');
      } else if (this._price <= 0) {
         throw new Error('Price is required!');
      }
   }

   orderItemTotal() {
      return this._quantity * this._price;
   }

   toString() {
      return `${this._productName} - ${this._quantity} x ${this._price}`;
   }
}
