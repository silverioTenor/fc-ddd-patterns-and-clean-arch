import IValidator from '@domain/@shared/validator/validator.interface';
import Order from '../entity/order';
import * as yup from 'yup';

export default class OrderYupValidator implements IValidator<Order> {
   validate(entity: Order): void {
      {
         try {
            yup.object()
               .shape({
                  id: yup.string().required('Id is required!'),
                  customerId: yup.string().required('Customer ID is required!'),
                  items: yup.array().min(1, 'Must have at least one item!'),
               })
               .validateSync(
                  {
                     id: entity.getId(),
                     customerId: entity.getCustomerId(),
                     items: entity.getItems(),
                  },
                  { abortEarly: false },
               );
         } catch (errors) {
            const e = errors as yup.ValidationError;

            e.errors.forEach(error => {
               entity.notification.addError({
                  context: 'order',
                  message: error,
               });
            });
         }
      }
   }
}
