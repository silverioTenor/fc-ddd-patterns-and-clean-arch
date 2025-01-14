import OrderItem from './order_item';

export default class Order {
   constructor(
      public readonly id: string,
      public readonly customerId: string,
      public readonly items: OrderItem[],
   ) {
      this.validate();
   }

   validate() {
      if (this.id.length === 0) {
         throw new Error('Id is required!');
      } else if (this.customerId.length === 0) {
         throw new Error('Customer id is required!');
      } else if (this.items.length === 0) {
         throw new Error('Items are required!');
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

   toString() {
      return `Order #${this.id} - Customer #${this.customerId}`;
   }
}
