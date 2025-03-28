import IValidator from "@domain/@shared/validator/validator.interface";
import Order from "../entity/order";
import OrderYupValidator from "../validator/order.yup.validator";

export default abstract class OrderValidatorFactory {
   static create(): IValidator<Order> {
      return new OrderYupValidator();
   }
}
