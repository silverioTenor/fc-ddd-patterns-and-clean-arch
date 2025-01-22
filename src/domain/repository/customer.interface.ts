import Customer from "../entity/customer";
import IRepository from "./repository.interface";

export default interface ICustomertRepository extends IRepository<Customer> {}
