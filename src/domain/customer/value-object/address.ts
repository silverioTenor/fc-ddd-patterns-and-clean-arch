import NotificationError from '../../@shared/notification/notification.error';
import Entity from '@domain/@shared/entity/entity.abstract';
import AddressValidatorFactory from '../factory/address.validator.factory';

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
      AddressValidatorFactory.create().validate(this);
   }

   toString() {
      return `${this.street}, ${this.number} - ${this.city}/${this.state}, ${this.country} - ${this.postalCode}`;
   }
}
