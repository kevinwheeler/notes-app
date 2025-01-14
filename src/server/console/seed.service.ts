import { Console, Command, createSpinner } from 'nestjs-console';

@Console()
export class SeedService {
  // constructor() {}

  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();

    spin.start('Seeding the DB');

    // await this.seedThings();

    spin.succeed('Seeding done');
  }

  // async seedThings() {
  //   const things = [{ name: 'this is a thing you can note' }];

  //   for (const thingParams of things) {
  //     const thing = await this.thingsService.findOne({
  //       where: thingParams,
  //     });
  //     if (!thing) {
  //       await this.thingsService.create(thingParams);
  //     }
  //   }
  // }
}
