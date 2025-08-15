import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from '../domain/entities/product.entity';

async function run() {
  const ds = new DataSource({
    type: 'sqlite',
    database: process.env.SQLITE_PATH || 'product.db',
    synchronize: true,
    entities: [Product],
  });
  await ds.initialize();
  const repo = ds.getRepository(Product);
  const count = await repo.count();
  if (count === 0) {
    await repo.save([
      { name: 'Keyboard', description: 'Mechanical', price: 79.99 },
      { name: 'Mouse', description: 'Wireless', price: 39.99 },
      { name: 'Monitor', description: '27 inch', price: 229.99 },
    ]);
  }
  await ds.destroy();
}

void run();
