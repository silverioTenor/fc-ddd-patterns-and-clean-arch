import Order from "@domain/checkout/entity/order";
import IOrderRepository from "@domain/checkout/repository/order.interface";
import Mapper from "@util/mapper";
import { InputFindOrderDto, OutputFindOrderDto } from "./find.order.dto";

export default class FindOrderUseCase {
   constructor(private orderRepository: IOrderRepository) {}

   async execute(input: InputFindOrderDto): Promise<OutputFindOrderDto> {
      const foundOrder = await this.orderRepository.find(input.id);
      return Mapper.convertTo<Order, OutputFindOrderDto>(foundOrder);
   }
}
