import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/server/app/app.module';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as cookieParser from 'cookie-parser';

import { usersFactory, notesFactory } from 'test/factories';
import { UsersService } from 'src/server/app/users/users.service';
import { User } from 'src/server/app/users/user.entity';
import { Note } from 'src/server/app/notes/note.entity';
import { NotesService } from 'src/server/app/notes/notes.service';
import { JwtAuthService } from 'src/server/app/auth/jwt/jwt-auth.service';
import { login } from './utils';

describe('Application', () => {
  let app: INestApplication;
  let authService: JwtAuthService;
  let usersService: UsersService;
  let notesService: NotesService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();

    usersService = app.get(UsersService);
    notesService = app.get(NotesService);
    authService = app.get(JwtAuthService);
    dataSource = app.get(DataSource);
  });

  beforeEach(async () => {
    await dataSource.synchronize(true);
  });

  describe('GraphQL', () => {
    const endpoint = '/graphql';
    let agent: request.Test;

    beforeEach(async () => {
      agent = request(app.getHttpServer()).post(endpoint);
    });

    describe('users', () => {
      const query = '{ users { id provider } }';
      let user: User;

      beforeEach(async () => {
        user = await usersService.create(usersFactory.build());
      });

      it('returns users', () => {
        return agent
          .send({ query: query })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.users).toHaveLength(1);
            expect(res.body.data.users[0].id).toEqual(user.id);
            expect(res.body.data.users[0].provider).toEqual(user.provider);
          });
      });
    });

    describe('notes', () => {
      const query = '{ notes { id alias } }';
      let user: User;
      let note: Note;

      it('returns unauthorized', () => {
        return agent
          .send({ query: query })
          .expect(200)
          .expect((res) => {
            expect(res.body.errors).toHaveLength(1);
            expect(res.body.errors[0].message).toEqual('Unauthorized');
          });
      });

      describe('when authorized', () => {
        beforeEach(async () => {
          user = await usersService.create(usersFactory.build());
          note = await notesService.create(
            notesFactory.build({}, { associations: { user: user } }),
          );
        });

        it('returns notes', () => {
          return login(agent, user, authService)
            .send({ query: query })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.notes).toHaveLength(1);
              expect(res.body.data.notes[0].id).toEqual(note.id);
            });
        });
      });
    });
  });
});
