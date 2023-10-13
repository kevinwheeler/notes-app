import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { OrdersModule } from './orders.module';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { usersFactory, ordersFactory } from 'test/factories';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('OrdersResolver', () => {
  let resolver: OrdersResolver;
  let ordersService: OrdersService;
  let usersService: UsersService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: true,
          }),
          inject: [ConfigService],
        }),
        OrdersModule,
        UsersModule,
      ],
    }).compile();

    resolver = moduleRef.get<OrdersResolver>(OrdersResolver);
    ordersService = moduleRef.get<OrdersService>(OrdersService);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  describe('orders', () => {
    it('returns orders of user', async () => {
      const user = await usersService.create(usersFactory.build());
      const order = await ordersService.create(
        ordersFactory.build({}, { associations: { user: user } }),
      );

      const result = await resolver.orders(user);

      expect([order]).toMatchObject(result);
    });

    it('does not return orders of another user', async () => {
      const anotherUser = await usersService.create(usersFactory.build());
      await ordersService.create(
        ordersFactory.build({}, { associations: { user: anotherUser } }),
      );

      const user = await usersService.create(usersFactory.build());
      const result = await resolver.orders(user);

      expect(result).toEqual([]);
    });
  });

  describe('createOrder', () => {
    it('returns the order', async () => {
      const user = await usersService.create(usersFactory.build());
      const alias = ordersFactory.build().alias;

      const result = await resolver.createOrder(user, alias);

      expect(result).toMatchObject({ alias: alias });
    });

    it('creates an order', async () => {
      const user = await usersService.create(usersFactory.build());
      const alias = ordersFactory.build().alias;

      await resolver.createOrder(user, alias);

      const orderCount = (
        await ordersService.findAll({ where: { user: { id: user.id } } })
      ).length;
      expect(orderCount).toEqual(1);
    });

    it('does not create the same order twice', async () => {
      const user = await usersService.create(usersFactory.build());
      const alias = ordersFactory.build().alias;

      await resolver.createOrder(user, alias);
      await resolver.createOrder(user, alias);

      const orderCount = (
        await ordersService.findAll({ where: { user: { id: user.id } } })
      ).length;
      expect(orderCount).toEqual(1);
    });
  });
});
