import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate';
import Address from '../value-object/address';
import 'dotenv/config';
import { ICustomer } from './customer.interface';
import HttpValidation from '@infra/api/errors/http.validation.error';

export default class Customer implements ICustomer {
   private id: string;
   private name: string;
   private active: boolean = false;
   private address!: Address;
   private rewardPoints: number = 0;

   constructor(name: string, id?: string) {
      this.id = !!id ? id : uuid();
      this.name = name;
      this.validate();
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
      if (this.id.length === 0 || validate.version(this.id) !== 4) {
         throw new HttpValidation('ID is required!');
      } else if (this.name.length === 0) {
         throw new HttpValidation('Name is required!');
      }
   }

   changeName(name: string) {
      if (name.length === 0) {
         throw new HttpValidation('Name is required!');
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
         throw new HttpValidation('Address is mandatory to activate a customer!');
      }

      this.active = true;
   }

   deactivate() {
      this.active = false;
   }

   addPoints(points: number) {
      if (points < 0) {
         throw new HttpValidation('Points must be equal or greater than 0!');
      }

      this.rewardPoints += points;
   }
}
