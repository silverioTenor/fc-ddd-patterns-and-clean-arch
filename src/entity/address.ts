export default class Address {
   constructor(
      public readonly street: string,
      public readonly number: number,
      public readonly city: string,
      public readonly state: string,
      public readonly country: string,
      public readonly postalCode: string,
   ) {
      this.validate();
   }

   validate() {
      if (this.street.length === 0) {
         throw new Error('Street is required!');
      } else if (this.number === 0) {
         throw new Error('Number is required!');
      } else if (this.city.length === 0) {
         throw new Error('City is required!');
      } else if (this.state.length === 0) {
         throw new Error('State is required!');
      } else if (this.country.length === 0) {
         throw new Error('Country is required!');
      } else if (this.postalCode.length === 0) {
         throw new Error('Postal code is required!');
      }
   }

   toString() {
      return `${this.street}, ${this.number} - ${this.city}/${this.state}, ${this.country} - ${this.postalCode}`;
   }
}
