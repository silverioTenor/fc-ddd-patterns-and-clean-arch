import IValidator from "@domain/@shared/validator/validator.interface";
import OrderItemYupValidator from "../validator/order-item.yup.validator";
import OrderItem from "../entity/order-item";

export default abstract class OrderItemValidatorFactory {
   static create(): IValidator<OrderItem> {
      return new OrderItemYupValidator();
   }
}
