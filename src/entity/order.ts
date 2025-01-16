import validate from 'uuid-validate';
import OrderItem from './order_item';
import 'dotenv/config';

export default class Order {
   private _id: string;
   private _customerId: string;
   private _items: OrderItem[];

   constructor(id: string, _customerId: string, _items: OrderItem[]) {
      this._id = id;
      this._customerId = _customerId;
      this._items = _items;

      this.validate();
   }

   get id() {
      return this._id;
   }

   get customerId() {
      return this._customerId;
   }

   get items() {
      return this._items;
   }

   validate() {
      if (this._id.length === 0 || validate.version(this._id) !== Number(process.env.UUID_VERSION)) {
         throw new Error('Id is required!');
      } else if (this._customerId.length === 0 || validate.version(this._customerId) !== 4) {
         throw new Error('Customer id is required!');
      } else if (this._items.length === 0) {
         throw new Error('Items are required!');
      } else if (this._items.some((item) => item.quantity <= 0)) {
         throw new Error('Quantity must be greater than zero');
      }
   }

   addItem(item: OrderItem) {
      this._items.push(item);
   }

   removeItem(item: OrderItem) {
      const index = this._items.indexOf(item);
      if (index > -1) {
         this._items.splice(index, 1);
      }
   }

   total() {
      return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
   }

   toString() {
      return `Order #${this._id} - Customer #${this._customerId}`;
   }
}
