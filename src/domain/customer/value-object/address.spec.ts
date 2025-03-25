import Address from './address';

describe('Address unit tests', () => {
   it('should create an address', () => {
      const address = new Address('Rua A', 123, 'São Paulo', 'SP', 'Brazil', 12345678);

      expect(address).toBeDefined();
      expect(address.getStreet()).toBe('Rua A');
      expect(address.getNumber()).toBe(123);
      expect(address.getCity()).toBe('São Paulo');
      expect(address.getState()).toBe('SP');
      expect(address.getCountry()).toBe('Brazil');
      expect(address.getPostalCode()).toBe(12345678);
   });

   it('should throw an error when street is empty', () => {
      expect(() => {
         new Address('', 123, 'São Paulo', 'SP', 'Brazil', 12345678);
      }).toThrow('address: Street is required!');
   });

   it('should throw an error when number is 0', () => {
      expect(() => {
         new Address('Rua A', 0, 'São Paulo', 'SP', 'Brazil', 12345678);
      }).toThrow('address: Number is required!');
   });

   it('should throw an error when city is empty', () => {
      expect(() => {
         new Address('Rua A', 123, '', 'SP', 'Brazil', 12345678);
      }).toThrow('address: City is required!');
   });

   it('should throw an error when state is empty', () => {
      expect(() => {
         new Address('Rua A', 123, 'São Paulo', '', 'Brazil', 12345678);
      }).toThrow('address: State is required!');
   });

   it('should throw an error when country is empty', () => {
      expect(() => {
         new Address('Rua A', 123, 'São Paulo', 'SP', '', 12345678);
      }).toThrow('address: Country is required!');
   });

   it('should throw an error when postal code is 0', () => {
      expect(() => {
         new Address('Rua A', 123, 'São Paulo', 'SP', 'Brazil', 0);
      }).toThrow('address: Postal code is required!');
   });

   it('should return the address as a string', () => {
      const address = new Address('Rua A', 123, 'São Paulo', 'SP', 'Brazil', 12345678);

      expect(address.toString()).toBe('Rua A, 123 - São Paulo/SP, Brazil - 12345678');
   });
});
