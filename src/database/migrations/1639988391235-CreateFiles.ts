import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFiles1639988391235 implements MigrationInterface {
    name = 'CreateFiles1639988391235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
