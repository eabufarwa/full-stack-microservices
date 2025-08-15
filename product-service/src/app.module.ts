import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './infrastructure/modules/product.module';
import { HealthModule } from './health/health.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ProductModule,
    HealthModule,
  ],
})
export class AppModule {}
