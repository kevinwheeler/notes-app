import { Request } from 'express';

type User = Request['user'];

export interface Note {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  user: User;
  created_at: Date;
  updated_at: Date;
}

export type NoteState = {
  data: Record<number, Note>;
  searchQuery: string;
};

export type RootState = {
  notes: NoteState;
};
