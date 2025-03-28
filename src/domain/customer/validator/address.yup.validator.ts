import IValidator from '@domain/@shared/validator/validator.interface';
import * as yup from 'yup';
import Address from '../value-object/address';

export default class AddressYupValidator implements IValidator<Address> {
   validate(entity: Address): void {
      try {
         yup.object()
            .shape({
               street: yup.string().required('Street is required!'),
               number: yup
                  .number()
                  .positive('Number must be positive!')
                  .integer('Number must be integer!')
                  .required('Number is required!'),
               city: yup.string().required('City is required!'),
               state: yup.string().required('State is required!'),
               country: yup.string().required('Country is required!'),
               postalCode: yup
                  .number()
                  .positive('Postal code must be greater than zero!')
                  .min(11111111, 'Postal code must have 8 digits!')
                  .integer('Postal code must be integer!')
                  .required('Postal code is required!'),
            })
            .validateSync(
               {
                  street: entity.getStreet(),
                  number: entity.getNumber(),
                  city: entity.getCity(),
                  state: entity.getState(),
                  country: entity.getCountry(),
                  postalCode: entity.getPostalCode(),
               },
               { abortEarly: false },
            );
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            entity.notification.addError({
               context: 'address',
               message: error,
            });
         });
      }
   }
}
