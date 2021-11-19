import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormConfig from './orm.config';

const ormSeedConfig: TypeOrmModuleOptions = {
  ...ormConfig,
  migrations: ['src/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/seeds',
  },
};

export default ormSeedConfig;
