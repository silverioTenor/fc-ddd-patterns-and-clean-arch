import IRepository from '../../@shared/repository/repository.interface';
import Customer from '../entity/customer';

export default interface ICustomertRepository extends IRepository<Customer> {
   updateAddress(entity: Customer): Promise<void>;
}
