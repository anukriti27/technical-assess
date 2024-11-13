import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',  // Change to your PostgreSQL user
      password: '1234', // Change to your PostgreSQL password
      database: 'users',  // The database name
      entities: [Users],
      synchronize: true,  // Set to false in production
    }),
    UsersModule,
  ],
})
export class AppModule {}
