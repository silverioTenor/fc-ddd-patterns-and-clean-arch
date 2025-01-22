export default class Address {
   private _street: string;
   private _number: number;
   private _city: string;
   private _state: string;
   private _country: string;
   private _postalCode: number;

   constructor(
      street: string,
      number: number,
      city: string,
      state: string,
      country: string,
      postalCode: number,
   ) {
      this._street = street;
      this._number = number;
      this._city = city;
      this._state = state;
      this._country = country;
      this._postalCode = postalCode;

      this.validate();
   }

   get street() {
      return this._street;
   }

   get number() {
      return this._number;
   }

   get city() {
      return this._city;
   }

   get state() {
      return this._state;
   }

   get country() {
      return this._country;
   }

   get postalCode() {
      return this._postalCode;
   }

   validate() {
      if (this.street.length === 0) {
         throw new Error('Street is required!');
      } else if (this._number === 0) {
         throw new Error('Number is required!');
      } else if (this._city.length === 0) {
         throw new Error('City is required!');
      } else if (this._state.length === 0) {
         throw new Error('State is required!');
      } else if (this._country.length === 0) {
         throw new Error('Country is required!');
      } else if (this._postalCode <= 0) {
         throw new Error('Postal code is required!');
      }
   }

   toString() {
      return `${this._street}, ${this._number} - ${this._city}/${this._state}, ${this._country} - ${this._postalCode}`;
   }
}
