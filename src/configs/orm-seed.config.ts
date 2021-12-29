import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormConfig from './orm.config';

const ormSeedConfig: TypeOrmModuleOptions = {
  ...ormConfig,
  migrations: ['src/database/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/seeds',
  },
};

export default ormSeedConfig;
