import Address from './address';

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
      if (this.id.length === 0) {
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
   }

   changeAddress(address: Address) {
      if (address.street.length === 0) {
         throw new Error('Address is required!');
      }

      this.address = address;
   }

   activate() {
      this.active = true;
   }

   deactivate() {
      this.active = false;
   }
}
