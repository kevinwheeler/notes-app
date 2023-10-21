import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppModule } from 'src/server/app/app.module';
import { ViewModule } from 'src/server/view/view.module';
import { GqlThrottlerGuard } from './app/guards/gql-throttler-guard';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // TODO extract this to config/constants or env var or wherever.
        limit: 1000, // TODO extract this to config/constants or env var or wherever.
      },
    ]),
    ViewModule,
    AppModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class ServerModule {}
