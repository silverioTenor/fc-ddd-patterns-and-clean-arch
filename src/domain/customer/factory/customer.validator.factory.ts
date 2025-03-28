import IValidator from "@domain/@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default abstract class CustomerValidatorFactory {
   static create(): IValidator<Customer> {
      return new CustomerYupValidator();
   }
}
