import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateContentVariants1639303173833 implements MigrationInterface {
    name = 'CreateContentVariants1639303173833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content_variants" ("id" SERIAL NOT NULL, "body" text NOT NULL, "contentId" integer NOT NULL, CONSTRAINT "PK_6779d2ead0457826a89d07a596f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "content_variants" ADD CONSTRAINT "FK_dd6ab189ff472b76c98279a0908" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_variants" DROP CONSTRAINT "FK_dd6ab189ff472b76c98279a0908"`);
        await queryRunner.query(`DROP TABLE "content_variants"`);
    }

}
