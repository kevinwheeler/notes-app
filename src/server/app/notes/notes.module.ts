import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { Note } from './note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NotesService, NotesResolver],
})
export class NotesModule {}
