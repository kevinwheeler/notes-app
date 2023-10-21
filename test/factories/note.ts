import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

import { CreateNoteDto } from 'src/server/app/notes/dto/create-note.dto';

export default Factory.define<CreateNoteDto>(({ associations }) => ({
  title: faker.lorem.words(3),
  content: faker.lorem.paragraphs(3),
  tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  user: associations.user,
}));
