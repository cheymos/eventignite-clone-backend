import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEvents1637491661647 implements MigrationInterface {
    name = 'CreateEvents1637491661647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "ownerId" integer NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_72bbe49600962f125177d7d6b68" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_72bbe49600962f125177d7d6b68"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
