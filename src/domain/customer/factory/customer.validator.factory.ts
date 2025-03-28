import IValidator from "@domain/@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CUstomerValidatorFactory {
   private constructor() {}

   static create(): IValidator<Customer> {
      return new CustomerYupValidator();
   }
}
