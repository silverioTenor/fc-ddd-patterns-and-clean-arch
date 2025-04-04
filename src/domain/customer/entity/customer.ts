import { v4 as uuid } from 'uuid';
import Address from '../value-object/address';
import 'dotenv/config';
import { ICustomer } from './customer.interface';
import Entity from '@domain/@shared/entity/entity.abstract';
import NotificationError from '@domain/@shared/notification/notification.error';
import CustomerValidatorFactory from '../factory/customer.validator.factory';

export default class Customer extends Entity implements ICustomer {
   private id: string;
   private name: string;
   private active: boolean = false;
   private address!: Address;
   private rewardPoints: number = 0;

   constructor(name: string, id?: string) {
      super();
      this.id = !!id ? id : uuid();
      this.name = name;
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

   getAddress() {
      return this.address;
   }

   getRewardPoints() {
      return this.rewardPoints;
   }

   validate() {
      CustomerValidatorFactory.create().validate(this);
   }

   changeName(name: string) {
      if (!(!!name)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Name is required!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this.name = name;
   }

   changeAddress(input: any) {
      const address = new Address(
         input.street,
         input.number,
         input.city,
         input.state,
         input.country,
         input.postalCode,
      );

      this.address = address;
   }

   isActive() {
      return this.active;
   }

   activate() {
      if (this.address === null || this.address === undefined) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Address is mandatory to activate a customer!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this.active = true;
   }

   deactivate() {
      this.active = false;
   }

   addPoints(points: number) {
      if (points < 0) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Points must be equal or greater than 0!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this.rewardPoints += points;
   }
}
