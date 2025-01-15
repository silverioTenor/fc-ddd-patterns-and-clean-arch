import validate from 'uuid-validate';
import OrderItem from './order_item';
import 'dotenv/config';

export default class Order {
   public readonly id: string;
   public readonly customerId: string;
   public readonly items: OrderItem[];

   constructor(id: string, customerId: string, items: OrderItem[]) {
      this.id = id;
      this.customerId = customerId;
      this.items = items;

      this.validate();
   }

   validate() {
      if (this.id.length === 0 || validate.version(this.id) !== Number(process.env.UUID_VERSION)) {
         throw new Error('Id is required!');
      } else if (this.customerId.length === 0 || validate.version(this.customerId) !== 4) {
         throw new Error('Customer id is required!');
      } else if (this.items.length === 0) {
         throw new Error('Items are required!');
      } else if (this.items.some((item) => item.quantity <= 0)) {
         throw new Error('Quantity must be greater than zero');
      }
   }

   addItem(item: OrderItem) {
      this.items.push(item);
   }

   removeItem(item: OrderItem) {
      const index = this.items.indexOf(item);
      if (index > -1) {
         this.items.splice(index, 1);
      }
   }

   total() {
      return this.items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
   }

   toString() {
      return `Order #${this.id} - Customer #${this.customerId}`;
   }
}
