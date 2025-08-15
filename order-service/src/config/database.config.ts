import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Order } from '../domain/entities/order.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: process.env.SQLITE_PATH || 'order.db',
  entities: [Order],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  maxQueryExecutionTime: 1000,
  migrations: ['dist/migrations/*.js'],
  migrationsRun: process.env.NODE_ENV === 'production',
  migrationsTableName: 'migrations',
};
