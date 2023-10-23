import { Request } from 'express';

type User = Request['user'];

export default interface Note {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  user: User;
  created_at: Date;
  updated_at: Date;
}
