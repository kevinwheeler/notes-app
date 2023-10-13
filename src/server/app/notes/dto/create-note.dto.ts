import { User } from '../../users/user.entity';

export class CreateNoteDto {
  alias: string;
  user: User;
}
