import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: "db.test",
  entities: [`${join(__dirname, '../dist/**/*.entity.js')}`],
  synchronize: true,
};
