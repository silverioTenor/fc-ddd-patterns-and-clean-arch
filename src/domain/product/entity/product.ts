import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate';
import 'dotenv/config';
import IProduct from './product.interface';
import HttpValidation from '@infra/@shared/api/error/http.validation.error';
import Entity from '@domain/@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';

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
      if (!(!!this.id) || validate.version(this.id) !== 4) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'ID is required and must be a valid UUID'
         });
      }
      if (!(!!this.name)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Name is required'
         });
      }
      if (!(!!this.price) || this.price <= 0) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Price must be greater than zero'
         });
      }
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
