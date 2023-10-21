import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Length, IsArray, ArrayMaxSize } from 'class-validator';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { TagLengthIsValid } from './tagLength.decorator';

@ObjectType()
@Entity()
export class Note {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  @Length(1, 100)
  title: string;

  @Field()
  @Column({ nullable: false })
  @Length(20, 300)
  content: string;

  // This would be better as a separate entity with a ManyToMany relationship,
  // But this is simpler since this is just a demo.
  @Field((_type) => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  @IsArray()
  @TagLengthIsValid()
  @ArrayMaxSize(30)
  tags: string[];

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.notes, { nullable: false })
  user: User;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
