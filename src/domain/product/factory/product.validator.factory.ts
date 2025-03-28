import IValidator from "@domain/@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductYupValidator from "../validator/product.yup.validator";

export default abstract class ProductValidatorFacotry {
   static create(): IValidator<Product> {
      return new ProductYupValidator();
   }
}
