import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate';
import 'dotenv/config';
import Entity from '@domain/@shared/entity/entity.abstract';
import NotificationError from '@domain/@shared/notification/notification.error';

export default class OrderItem extends Entity {
   private id: string;

   constructor(
      private productId: string,
      private productName: string,
      private quantity: number,
      private price: number,
      id?: string,
   ) {
      super();
      this.id = !!id ? id : uuid();
      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
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
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'ID is required!',
         });
      } else if (!(!!this.productId) || validate.version(this.productId) !== 4) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Product ID is required!',
         });
      } else if (!(!!this.productName)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Product name is required!',
         });
      } else if (!(!!this.quantity) || this.quantity <= 0) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Quantity must be greater than zero!',
         });
      } else if (!(!!this.price) || this.price <= 0) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Price is required!',
         });
      }
   }

   orderItemTotal() {
      return this.quantity * this.price;
   }

   toString() {
      return `${this.productName} - ${this.quantity} x ${this.price}`;
   }
}
