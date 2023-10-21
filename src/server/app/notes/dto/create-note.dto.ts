import { User } from '../../users/user.entity';

import {
  IsString,
  Length,
  ValidateNested,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TagLengthIsValid } from '../tagLength.decorator';

export class CreateNoteInput {}
export class CreateNoteDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(20, 300)
  content: string;

  @IsArray()
  @Type(() => String)
  @TagLengthIsValid()
  @ArrayMaxSize(30)
  tags: string[];

  user: User;
}
