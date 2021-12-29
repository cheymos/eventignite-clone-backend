import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRefreshTokens1637484778354 implements MigrationInterface {
    name = 'CreateRefreshTokens1637484778354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "refreshToken" text NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}
