export default class OrderItem {
   constructor(
      public readonly id: string,
      public readonly productName: string,
      public readonly quantity: number,
      public readonly price: number,
   ) {
      this.validate();
   }

   validate() {
      if (this.id.length === 0) {
         throw new Error('ID is required!');
      } else if (this.productName.length === 0) {
         throw new Error('Product name is required!');
      } else if (this.quantity === 0) {
         throw new Error('Quantity is required!');
      } else if (this.price === 0) {
         throw new Error('Price is required!');
      }
   }

   toString() {
      return `${this.productName} - ${this.quantity} x ${this.price}`;
   }
}
