import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePlaylists1637501850026 implements MigrationInterface {
    name = 'CreatePlaylists1637501850026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playlists" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "ownerId" integer NOT NULL, CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_aa5d498a2f045be2fb71ef98d45" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_aa5d498a2f045be2fb71ef98d45"`);
        await queryRunner.query(`DROP TABLE "playlists"`);
    }

}
