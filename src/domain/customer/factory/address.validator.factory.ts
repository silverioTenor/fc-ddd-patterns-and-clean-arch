import IValidator from "../../@shared/validator/validator.interface";
import AddressYupValidator from "../validator/address.yup.validator";
import Address from "../value-object/address";

export default abstract class AddressValidatorFactory {
   static create(): IValidator<Address> {
      return new AddressYupValidator();
   }
}
