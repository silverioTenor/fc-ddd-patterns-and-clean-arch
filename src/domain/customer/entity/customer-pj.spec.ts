import Address from '../value-object/address';
import CustomerPj from './customer-pj';

describe('Customer PJ unit tests', () => {
   it('should create an instance', () => {
      const customerPj = new CustomerPj('Company name', 'trade name', 12345678901234);
      const address = new Address('Street', 123, 'City', 'State', 'Country', 12345678);

      customerPj.changeAddress(address);

      expect(customerPj.id).toBeDefined();
      expect(customerPj.address).toStrictEqual(address);
   });

   it('should throw an error when creating an instance without company name', () => {
      expect(() => new CustomerPj('', 'trade name', 12345678901234)).toThrow('Name is required!');
   });

   it('should throw an error when creating an instance with invalid cnpj', () => {
      expect(() => new CustomerPj('Company name', 'Trade name', 12345678)).toThrow('Invalid cnpj!');
   });

   it('should change the trade name', () => {
      const customerPj = new CustomerPj('Company name', 'trade name', 12345678901234);
      customerPj.changeTradeName('Charlie Bucket');

      expect(customerPj.tradeName).toBe('Charlie Bucket');
   });

   it('should throw an error when changing the trade name to an empty string', () => {
      expect(() => {
         const customerPj = new CustomerPj('Company name', '', 12345678901234);
         customerPj.changeTradeName('Charlie Bucket');
      }).toThrow('Trade name is required!');
   });
});
