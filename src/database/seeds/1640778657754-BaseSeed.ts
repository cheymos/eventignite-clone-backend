import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseSeed1640778657754 implements MigrationInterface {
  private readonly ownerId =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQzN3ZHRF9XdFYydkVpS3dnSktTUSJ9.eyJpc3MiOiJodHRwczovL2Rldi16d2MtNmd2cy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjFhY2U0NTkwMzZhYmQwMDZiYzRjMzFlIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHBzOi8vZGV2LXp3Yy02Z3ZzLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NDE2NDc5NTAsImV4cCI6MTY0MTczNDM1MCwiYXpwIjoiWTljYU4xME5hZVpyMEZiY29lYTdTb3FpaTNDOVVsU2oiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.wqfLNC_7yZEhLu1y7kxGY_aBNqhjENIQGs73ZIugUQmLTr8yd8azStH7bhKyMcAJ1JAjBRrpgbHBfqTFgdJ8-DsjtoYXzrwEuF6V9PxYc7rzvF8KYfRUDgjhdgZMTAnO7ZwS6D_uNmZv9tf6Sorwym4xrxVIRBH3T0Z2G34-VBCl8HmojNFL4BrccujxY2jA9gVikKEIRkUNH6kuK-D5ppX86WCCMvOQWCOMzkyJd4VVAMGh78MBH89jBAaU6oNJTzhEGYjQ7N8fit3zO1K7BajrUGrvgd8NmMtpGBldhs9PftQPnnTRC-fTgutS9TEZ7gJ7WYAspwBVh7-XIulaXg';

  public async up(queryRunner: QueryRunner): Promise<void> {
    /* EVENTS */
    await queryRunner.query(
      `insert into events (name, description, "ownerId")
      values ('Super name event', 'This is description event', '${this.ownerId}')`,
    );

    /* PLAYLISTS */
    await queryRunner.query(
      `insert into playlists(name, description, "ownerId")
      values('This is playlist name', 'Playlist descripiton', '${this.ownerId}')`,
    );

    /* SCREENS */
    await queryRunner.query(
      `insert into screens(name, description, "eventId", "playlistId", "ownerId")
      values('Screen name', 'Screen description', 1, 1, '${this.ownerId}')`,
    );

    /* CONTENTS */
    await queryRunner.query(
      `insert into contents(type, "ownerId")
      values('video', '${this.ownerId}'), ('html', '${this.ownerId}')`,
    );

    /* FILES */
    await queryRunner.query(
      `insert into files(key, url)
      values('123456789', 'this is url'), ('987654321', 'second url')`,
    );

    /* CONTENT VARIANTS */
    await queryRunner.query(
      `insert into content_variants("contentId", "fileId")
      values(1, 1), (1, 2)`,
    );

    /* CONTENT PROPERTIES */
    await queryRunner.query(
      `insert into content_properties(property, value, "contentVariantId")
      values('first property', 'first value', 1)`,
    );

    /* PLAYLIST CONTENTS */
    await queryRunner.query(
      `insert into playlists_contents("contentId", "playlistId", pos, duration)
      values(1, 1, 1, 1000)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
