import { Module } from '@nestjs/common';

import { AppModule } from 'src/server/app/app.module';
import { ViewModule } from 'src/server/view/view.module';

@Module({
  imports: [ViewModule, AppModule],
})
export class ServerModule {}
