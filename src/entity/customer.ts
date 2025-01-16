import validate from 'uuid-validate';
import Address from './address';
import 'dotenv/config';

export default class Customer {
   private _id: string;
   private _name: string;
   private _active: boolean = false;
   private _address!: Address;

   constructor(_id: string, _name: string) {
      this._id = _id;
      this._name = _name;
      this.validade();
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

   validade() {
      if (this._id.length === 0 || validate.version(this._id) !== Number(process.env.UUID_VERSION)) {
         throw new Error('ID is required!');
      } else if (this._name.length === 0) {
         throw new Error('Name is required!');
      }
   }

   changeName(_name: string) {
      if (this._name.length === 0) {
         throw new Error('Name is required!');
      }

      this._name = _name;
      this.validade();
   }

   changeAddress(address: Address) {
      if (address?.street.length === 0) {
         throw new Error('Address is required!');
      }

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
}
