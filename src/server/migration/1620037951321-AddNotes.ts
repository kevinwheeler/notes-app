import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotes1620037951321 implements MigrationInterface {
  name = 'AddNotes1620037951321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "note" (
        "id" SERIAL NOT NULL,
        "title" CHARACTER VARYING(100) NOT NULL CHECK (LENGTH(title) >= 1),
        "content" CHARACTER VARYING(300) NOT NULL CHECK (LENGTH(content) >= 20),
        "tags" CHARACTER VARYING(50)[] NOT NULL CHECK (cardinality(tags) <= 30),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "userId" integer,
        CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
        )`,
    );

    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_cea8091f3cb66cba2b985c520f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(`DROP TABLE "note"`);
  }
}
