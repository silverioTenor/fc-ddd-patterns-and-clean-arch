import IValidator from '@domain/@shared/validator/validator.interface';
import * as yup from 'yup';
import OrderItem from '../entity/order-item';

export default class OrderItemYupValidator implements IValidator<OrderItem> {
   validate(entity: OrderItem): void {
      {
         try {
            yup.object()
               .shape({
                  id: yup.string().required('Id is required!'),
                  productId: yup.string().required('Product ID is required!'),
                  productName: yup.string().required('Product name is required!'),
                  quantity: yup
                     .number()
                     .positive('Quantity must be greater than zero!')
                     .integer('Quantity must be an integer!')
                     .required('Customer ID is required!'),
                  price: yup
                     .number()
                     .positive('Price must be greater than zero!')
                     .required('Price is required!'),
               })
               .validateSync(
                  {
                     id: entity.getId(),
                     productId: entity.getProductId(),
                     productName: entity.getProductName(),
                     quantity: entity.getQuantity(),
                     price: entity.getPrice(),
                  },
                  { abortEarly: false },
               );
         } catch (errors) {
            const e = errors as yup.ValidationError;

            e.errors.forEach(error => {
               entity.notification.addError({
                  context: 'orderItem',
                  message: error,
               });
            });
         }
      }
   }
}
