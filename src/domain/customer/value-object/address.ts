import NotificationError from '../../@shared/notification/notification.error';
import Entity from '@domain/@shared/entity/entity.abstract';

export default class Address extends Entity {
   private street: string;
   private number: number;
   private city: string;
   private state: string;
   private country: string;
   private postalCode: number;

   constructor(
      street: string,
      number: number,
      city: string,
      state: string,
      country: string,
      postalCode: number,
   ) {
      super();
      this.street = street;
      this.number = number;
      this.city = city;
      this.state = state;
      this.country = country;
      this.postalCode = postalCode;

      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   getStreet() {
      return this.street;
   }

   getNumber() {
      return this.number;
   }

   getCity() {
      return this.city;
   }

   getState() {
      return this.state;
   }

   getCountry() {
      return this.country;
   }

   getPostalCode() {
      return this.postalCode;
   }

   validate() {
      if (!(!!this.street)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Street is required!',
         });
      }
      if (this.number === 0) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Number is required!',
         });
      }
      if (!(!!this.city)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'City is required!',
         });
      }
      if (!(!!this.state)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'State is required!',
         });
      }
      if (!(!!this.country)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Country is required!',
         });
      }
      if (!(!!this.postalCode) || this.postalCode <= 0) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Postal code is required!',
         });
      }
   }

   toString() {
      return `${this.street}, ${this.number} - ${this.city}/${this.state}, ${this.country} - ${this.postalCode}`;
   }
}
