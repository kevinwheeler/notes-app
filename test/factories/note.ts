import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

import { CreateNoteDto } from 'src/server/app/notes/dto/create-note.dto';

export default Factory.define<CreateNoteDto>(({ associations }) => ({
  alias: faker.internet.userName(),
  user: associations.user,
}));
