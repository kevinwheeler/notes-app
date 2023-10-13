import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/graphql/gql-auth.decorator';
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard';
import { User } from '../users/user.entity';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

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
    @Args({ name: 'alias', type: () => String }) alias: string,
  ) {
    console.log('in resolver');
    console.log('user = ', user);
    return this.notesService.create({
      alias: alias,
      user: user,
    });
  }
}
