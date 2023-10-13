import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Provider } from 'src/server/common/types/user';
import { Note } from '../notes/note.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  provider: Provider;

  @Field()
  @Column({ nullable: false })
  providerId: string;

  @Field()
  @Column({ nullable: false })
  username: string;

  @Field()
  @Column({ nullable: false })
  name?: string;

  @Field((_type) => [Note], { nullable: 'items' })
  @OneToMany((_type) => Note, (note) => note.user)
  notes?: Note[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
