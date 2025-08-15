import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './infrastructure/modules/order.module';
import { HealthModule } from './health/health.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    OrderModule,
    HealthModule,
  ],
})
export class AppModule {}
