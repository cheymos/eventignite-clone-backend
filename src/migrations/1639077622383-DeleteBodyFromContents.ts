import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteBodyFromContents1639077622383 implements MigrationInterface {
    name = 'DeleteBodyFromContents1639077622383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents" DROP COLUMN "body"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents" ADD "body" text NOT NULL`);
    }

}
