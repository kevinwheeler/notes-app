import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(order: CreateOrderDto) {
    return this.ordersRepository.save(order);
  }

  findOne(params: FindOneOptions<Order> = {}) {
    return this.ordersRepository.findOne(
      Object.assign({ relations: ['user'] }, params),
    );
  }

  findAll(params: FindManyOptions<Order> = {}) {
    return this.ordersRepository.find(
      Object.assign({ relations: ['user'] }, params),
    );
  }

  async findOrCreateOne(params: FindOneOptions<Order> = {}) {
    let order: Order;

    order = await this.findOne(params);
    if (!order) {
      const conditions = params.where as CreateOrderDto;
      order = await this.create({
        alias: conditions.alias,
        user: conditions.user,
      });
    }

    return order;
  }
}
