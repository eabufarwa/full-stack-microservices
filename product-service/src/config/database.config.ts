import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../domain/entities/product.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: process.env.SQLITE_PATH || 'product.db',
  entities: [Product],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  maxQueryExecutionTime: 1000,
  migrations: ['dist/migrations/*.js'],
  migrationsRun: process.env.NODE_ENV === 'production',
  migrationsTableName: 'migrations',
};
