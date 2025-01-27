import ProductFactory from "./product.factory";

describe('Product factory unit tests', () => {
   it('should create a product whose type is "a"', () => {
      const product = ProductFactory.create('a', 'Product XPTO', 18);

      expect(product.id).toBeDefined();
      expect(product.constructor.name).toBe('Product');
      expect(product.name).toBe('Product XPTO');
      expect(product.price).toBe(18);
   });

   it('should create a product whose type is "b"', () => {
      const product = ProductFactory.create('b', 'Product XPTO', 18);

      expect(product.id).toBeDefined();
      expect(product.constructor.name).toBe('ProductB');
      expect(product.name).toBe('Product XPTO');
      expect(product.price).toBe(18);
   });

   it('should throw an error when product type is not supported', () => {
      expect(() => {
         const product = ProductFactory.create('invalid-type', 'Product XPTO', 18);
      }).toThrow('Product type not supported');
   });
});
