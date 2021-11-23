import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePlaylistsContents1637679532661 implements MigrationInterface {
    name = 'CreatePlaylistsContents1637679532661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playlists_contents" ("id" SERIAL NOT NULL, "playlistId" integer NOT NULL, "contentId" integer NOT NULL, "pos" smallint NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_77df9eae7dfd16dc291ee69450d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "playlists_contents" ADD CONSTRAINT "FK_4bab11ebc1d7a5bfb73d7e03b15" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists_contents" ADD CONSTRAINT "FK_f2214aee1cfe0d54a5812525117" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlists_contents" DROP CONSTRAINT "FK_f2214aee1cfe0d54a5812525117"`);
        await queryRunner.query(`ALTER TABLE "playlists_contents" DROP CONSTRAINT "FK_4bab11ebc1d7a5bfb73d7e03b15"`);
        await queryRunner.query(`DROP TABLE "playlists_contents"`);
    }

}
