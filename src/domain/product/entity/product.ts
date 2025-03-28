import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import IProduct from './product.interface';
import Entity from '@domain/@shared/entity/entity.abstract';
import NotificationError from '@domain/@shared/notification/notification.error';
import ProductValidatorFacotry from '../factory/product.validator.factory';

export default class Product extends Entity implements IProduct {
   private id: string;

   constructor(
      private name: string,
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

   getName() {
      return this.name;
   }

   getPrice() {
      return this.price;
   }

   validate() {
      ProductValidatorFacotry.create().validate(this);
   }

   changePrice(price: number) {
      if (!(!!this.price) || this.price <= 0) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Price must be greater than zero'
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this.price = price;
   }

   toString() {
      return `${this.id} - ${this.name} - ${this.price}`;
   }
}
