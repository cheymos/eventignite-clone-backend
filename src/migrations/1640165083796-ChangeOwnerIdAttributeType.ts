import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeOwnerIdAttributeType1640165083796 implements MigrationInterface {
    name = 'ChangeOwnerIdAttributeType1640165083796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "contents" ADD "ownerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "ownerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screens" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "screens" ADD "ownerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD "ownerId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD "ownerId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screens" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "screens" ADD "ownerId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "ownerId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contents" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "contents" ADD "ownerId" integer NOT NULL`);
    }

}
