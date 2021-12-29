import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateContents1637673748597 implements MigrationInterface {
    name = 'CreateContents1637673748597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contents_type_enum" AS ENUM('video', 'audio', 'picture', 'html')`);
        await queryRunner.query(`CREATE TABLE "contents" ("id" SERIAL NOT NULL, "type" "public"."contents_type_enum" NOT NULL, "body" text NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "PK_b7c504072e537532d7080c54fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contents" ADD CONSTRAINT "FK_4017268ac0bd06688535bf71c69" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents" DROP CONSTRAINT "FK_4017268ac0bd06688535bf71c69"`);
        await queryRunner.query(`DROP TABLE "contents"`);
        await queryRunner.query(`DROP TYPE "public"."contents_type_enum"`);
    }

}
