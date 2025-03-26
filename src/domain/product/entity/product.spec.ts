import Product from './product';

describe('Product unit tests', () => {
   it('should create a new Product instance', () => {
      // Arrange
      const name = 'Product Name';
      const price = 100;
      // Act
      const product = new Product(name, price);
      // Assert
      expect(product).toBeInstanceOf(Product);
      expect(product.getName()).toBe(name);
      expect(product.getPrice()).toBe(price);
   });

   it('should throw an error if the name is empty', () => {
      expect(() => new Product('', 100)).toThrow('product: Name is required');
   });

   it('should throw an error if the price is less than or equal to zero', () => {
      expect(() => new Product('Product Name', 0)).toThrow(
         'product: Price must be greater than zero',
      );
   });

   it('should change the price of the product', () => {
      const product = new Product('Product Name', 100);
      product.changePrice(200);

      expect(product.getPrice()).toBe(200);
   });

   it('should return the product as a string', () => {
      const product = new Product('Product Name', 100);
      expect(product.toString()).toBe(`${product.getId()} - ${product.getName()} - ${product.getPrice()}`);
   });
});
