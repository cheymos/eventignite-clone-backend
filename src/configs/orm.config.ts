import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
});

const ormConfig = {
  ...getOrmConfig(),
};

export default ormConfig;
