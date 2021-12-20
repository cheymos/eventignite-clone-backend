import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeBodyToFileInContentVariants1639995285207 implements MigrationInterface {
    name = 'ChangeBodyToFileInContentVariants1639995285207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_variants" RENAME COLUMN "body" TO "fileId"`);
        await queryRunner.query(`ALTER TABLE "content_variants" DROP COLUMN "fileId"`);
        await queryRunner.query(`ALTER TABLE "content_variants" ADD "fileId" integer`);
        await queryRunner.query(`ALTER TABLE "content_variants" ADD CONSTRAINT "UQ_178f0d2801123ac53a9af311579" UNIQUE ("fileId")`);
        await queryRunner.query(`ALTER TABLE "content_variants" ADD CONSTRAINT "FK_178f0d2801123ac53a9af311579" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_variants" DROP CONSTRAINT "FK_178f0d2801123ac53a9af311579"`);
        await queryRunner.query(`ALTER TABLE "content_variants" DROP CONSTRAINT "UQ_178f0d2801123ac53a9af311579"`);
        await queryRunner.query(`ALTER TABLE "content_variants" DROP COLUMN "fileId"`);
        await queryRunner.query(`ALTER TABLE "content_variants" ADD "fileId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_variants" RENAME COLUMN "fileId" TO "body"`);
    }

}
