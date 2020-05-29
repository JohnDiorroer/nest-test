import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../../test/db-test';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig)],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // afterAll();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
