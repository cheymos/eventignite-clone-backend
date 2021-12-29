import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateScreens1637568950014 implements MigrationInterface {
    name = 'CreateScreens1637568950014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "screens" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "eventId" integer NOT NULL, "playlistId" integer NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "REL_8b358ebe5dbf10a07abbc9baeb" UNIQUE ("playlistId"), CONSTRAINT "PK_15b65ed44367c5411efccdd7de1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9e08a54b3470a9399fd883508d9" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_8b358ebe5dbf10a07abbc9baeb6" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_ff965f988bb4fcaae0348feab78" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_ff965f988bb4fcaae0348feab78"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_8b358ebe5dbf10a07abbc9baeb6"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9e08a54b3470a9399fd883508d9"`);
        await queryRunner.query(`DROP TABLE "screens"`);
    }

}
