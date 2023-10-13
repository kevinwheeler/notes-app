import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  create(note: CreateNoteDto) {
    return this.notesRepository.save(note);
  }

  findOne(params: FindOneOptions<Note> = {}) {
    return this.notesRepository.findOne(
      Object.assign({ relations: ['user'] }, params),
    );
  }

  findAll(params: FindManyOptions<Note> = {}) {
    return this.notesRepository.find(
      Object.assign({ relations: ['user'] }, params),
    );
  }

  async findOrCreateOne(params: FindOneOptions<Note> = {}) {
    let note: Note;

    note = await this.findOne(params);
    if (!note) {
      const conditions = params.where as CreateNoteDto;
      note = await this.create({
        alias: conditions.alias,
        user: conditions.user,
      });
    }

    return note;
  }
}
