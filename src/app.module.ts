import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tests',
      entities: [`${join(__dirname, "../dist/**/*.entity.js")}`],
      synchronize: true,
      logging:true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
    }),
    UsersModule,
  ],
})
export class AppModule {}
