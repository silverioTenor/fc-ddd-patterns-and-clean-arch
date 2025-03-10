import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate';
import Address from '../value-object/address';
import 'dotenv/config';
import { ICustomer } from './customer.interface';

export default class Customer implements ICustomer {
   private _id: string;
   private _name: string;
   private _active: boolean = false;
   private _address!: Address;
   private _rewardPoints: number = 0;

   constructor(name: string, id?: string) {
      this._id = !!id ? id : uuid();
      this._name = name;
      this.validate();
   }

   get id() {
      return this._id;
   }

   get name() {
      return this._name;
   }

   get address() {
      return this._address;
   }

   get rewardPoints() {
      return this._rewardPoints;
   }

   validate() {
      if (this._id.length === 0 || validate.version(this._id) !== 4) {
         throw new Error('ID is required!');
      } else if (this._name.length === 0) {
         throw new Error('Name is required!');
      }
   }

   recoverIdWhenComingFromStorage(id: string) {
      if (id.length <= 0) {
         throw new Error('ID is required!');
      }
      this._id = id;
   }

   changeName(name: string) {
      if (name.length === 0) {
         throw new Error('Name is required!');
      }

      this._name = name;
   }

   changeAddress(input: Address) {
      const address = new Address(
         input.street,
         input.number,
         input.city,
         input.state,
         input.country,
         input.postalCode,
      );

      this._address = address;
   }

   isActive() {
      return this._active;
   }

   activate() {
      if (this._address === null || this._address === undefined) {
         throw new Error('Address is mandatory to activate a customer!');
      }

      this._active = true;
   }

   deactivate() {
      this._active = false;
   }

   addPoints(points: number) {
      if (points < 0) {
         throw new Error('Points must be greater than 0!');
      }

      this._rewardPoints += points;
   }
}
