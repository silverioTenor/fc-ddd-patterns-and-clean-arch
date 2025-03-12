import ProductFactory from "./product.factory";

describe('Product factory unit tests', () => {
   it('should create a product whose type is "a"', () => {
      const productFactory = new ProductFactory();
      const product = productFactory.create({
         type: 'A',
         name: 'Product XPTO',
         price: 18,
      });

      expect(product.getId()).toBeDefined();
      expect(product.constructor.name).toBe('Product');
      expect(product.getName()).toBe('Product XPTO');
      expect(product.getPrice()).toBe(18);
   });

   it('should create a product whose type is "b"', () => {
      const productFactory = new ProductFactory();
      const product = productFactory.create({
         type: 'B',
         name: 'Product XPTO',
         price: 18,
      });

      expect(product.getId()).toBeDefined();
      expect(product.constructor.name).toBe('ProductB');
      expect(product.getName()).toBe('Product XPTO');
      expect(product.getPrice()).toBe(18);
   });

   it('should throw an error when product type is not supported', () => {
      expect(() => {
         const productFactory = new ProductFactory();
         const product = productFactory.create({
            type: 'invalid-type',
            name: 'Product XPTO',
            price: 18,
         });
      }).toThrow('Product type not supported');
   });
});
