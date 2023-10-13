import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { NotesModule } from './notes.module';
import { NotesResolver } from './notes.resolver';
import { NotesService } from './notes.service';
import { usersFactory, notesFactory } from 'test/factories';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('NotesResolver', () => {
  let resolver: NotesResolver;
  let notesService: NotesService;
  let usersService: UsersService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: true,
          }),
          inject: [ConfigService],
        }),
        NotesModule,
        UsersModule,
      ],
    }).compile();

    resolver = moduleRef.get<NotesResolver>(NotesResolver);
    notesService = moduleRef.get<NotesService>(NotesService);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  describe('notes', () => {
    it('returns notes of user', async () => {
      const user = await usersService.create(usersFactory.build());
      const note = await notesService.create(
        notesFactory.build({}, { associations: { user: user } }),
      );

      const result = await resolver.notes(user);

      expect([note]).toMatchObject(result);
    });

    it('does not return notes of another user', async () => {
      const anotherUser = await usersService.create(usersFactory.build());
      await notesService.create(
        notesFactory.build({}, { associations: { user: anotherUser } }),
      );

      const user = await usersService.create(usersFactory.build());
      const result = await resolver.notes(user);

      expect(result).toEqual([]);
    });
  });

  describe('createNote', () => {
    it('returns the note', async () => {
      const user = await usersService.create(usersFactory.build());
      const alias = notesFactory.build().alias;

      const result = await resolver.createNote(user, alias);

      expect(result).toMatchObject({ alias: alias });
    });

    it('creates an note', async () => {
      const user = await usersService.create(usersFactory.build());
      const alias = notesFactory.build().alias;

      await resolver.createNote(user, alias);

      const noteCount = (
        await notesService.findAll({ where: { user: { id: user.id } } })
      ).length;
      expect(noteCount).toEqual(1);
    });

    // Need to decide what behavior we want. I'm probably going to have
    // a note name field that must be unique, so that a user can't
    // submit a note with the same name or the same note twice.
    // it('does not create the same note twice', async () => {
    //   const user = await usersService.create(usersFactory.build());
    //   const alias = notesFactory.build().alias;

    //   await resolver.createNote(user, alias);
    //   await resolver.createNote(user, alias);

    //   const noteCount = (
    //     await notesService.findAll({ where: { user: { id: user.id } } })
    //   ).length;
    //   expect(noteCount).toEqual(1);
    // });
  });
});
