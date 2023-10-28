import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  ArgsType,
  Field,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../auth/graphql/gql-auth.decorator';
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard';
import { User } from '../users/user.entity';
import { Note } from './note.entity';
import { NotesService } from './notes.service';
import { TagLengthIsValid } from './tagLength.decorator';
import { ArrayMaxSize } from 'class-validator';

@ArgsType()
class CreateNoteArgs {
  @Field()
  title: string;

  @Field()
  content: string;

  @TagLengthIsValid()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  @ArrayMaxSize(30)
  tags: string[];
}
@Resolver((_of) => Note)
export class NotesResolver {
  constructor(@Inject(NotesService) private notesService: NotesService) {}

  @Query((_returns) => [Note])
  @UseGuards(GqlAuthGuard)
  notes(@CurrentUser() user: User) {
    return this.notesService.findAll({ where: { user: { id: user.id } } });
  }

  @Mutation((_returns) => Note)
  @UseGuards(GqlAuthGuard)
  createNote(
    @CurrentUser() user: User,
    @Args() createNoteArgs: CreateNoteArgs,
  ) {
    console.log('user = ', user);
    return this.notesService.create({
      title: createNoteArgs.title,
      content: createNoteArgs.content,
      tags: createNoteArgs.tags,
      user: user,
    });
  }

  @Mutation((_returns) => Note)
  @UseGuards(GqlAuthGuard)
  async updateNote(
    @CurrentUser() user: User,
    @Args('id') id: number,
    @Args('title', { type: () => String, nullable: true }) title?: string,
    @Args('content', { type: () => String, nullable: true }) content?: string,
    @Args('tags', { type: () => [String], nullable: true }) tags?: string[],
  ) {
    // Construct the update object based on provided fields
    const updateFields: Partial<Note> = {};
    if (title !== undefined) updateFields.title = title;
    if (content !== undefined) updateFields.content = content;
    if (tags !== undefined) updateFields.tags = tags;

    // Notes belonging to other users can't be updated
    // So, add a check for ownership before updating
    const existingNote = await this.notesService.findOne({
      where: { id: +id, user: { id: user.id } },
    });
    if (!existingNote) {
      throw new Error(
        "Note not found or you don't have permission to update it.",
      );
    }

    return this.notesService.updateOne(+id, updateFields);
  }
}
