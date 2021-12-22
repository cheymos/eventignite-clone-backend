import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUsersAndRefreshTokens1640164239518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users" CASCADE`);
        await queryRunner.query(`DROP TABLE "refresh_tokens" CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
