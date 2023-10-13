import { User } from '../../users/user.entity';

export class CreateOrderDto {
  alias: string;
  user: User;
}
