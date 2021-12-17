import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateContentProperties1639772399575 implements MigrationInterface {
    name = 'CreateContentProperties1639772399575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content_properties" ("id" SERIAL NOT NULL, "property" character varying NOT NULL, "value" character varying NOT NULL, "contentVariantId" integer NOT NULL, CONSTRAINT "PK_1c825e39cc900212b0d07016e1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "content_properties" ADD CONSTRAINT "FK_ddaf71d526a147fbe33d4771025" FOREIGN KEY ("contentVariantId") REFERENCES "content_variants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_properties" DROP CONSTRAINT "FK_ddaf71d526a147fbe33d4771025"`);
        await queryRunner.query(`DROP TABLE "content_properties"`);
    }

}
