import validate from 'uuid-validate';
import Address from './address';
import 'dotenv/config';

export default class Customer {
   public readonly id: string;
   private name: string;
   private active: boolean = false;
   private address!: Address;

   constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
      this.validade();
   }

   validade() {
      if (this.id.length === 0 || validate.version(this.id) !== Number(process.env.UUID_VERSION)) {
         throw new Error('ID is required!');
      } else if (this.name.length === 0) {
         throw new Error('Name is required!');
      }
   }

   changeName(name: string) {
      if (this.name.length === 0) {
         throw new Error('Name is required!');
      }

      this.name = name;
      this.validade();
   }

   changeAddress(address: Address) {
      if (address?.street.length === 0) {
         throw new Error('Address is required!');
      }

      this.address = address;
   }

   isActive() {
      return this.active;
   }

   activate() {
      if (this.address === null || this.address === undefined) {
         throw new Error('Address is mandatory to activate a customer!');
      }

      this.active = true;
   }

   deactivate() {
      this.active = false;
   }
}
