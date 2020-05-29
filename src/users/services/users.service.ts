import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, DeepPartial } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import sleep from '../../utils/sleep';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getAll() {
    return this.userRepo.find();
  }

  async get(id: number) {
    return this.userRepo.findOne(id);
  }

  async create(input: DeepPartial<UserEntity>) {
    const res = await this.userRepo.save(this.userRepo.create(input));
    return res;
  }

  @Transactional()
  async update(
    idOrEntity: number | UserEntity,
    input: DeepPartial<UserEntity>,
    withFail = false,
    withDelay = false,
  ) {
    let user: UserEntity;
    if (typeof idOrEntity === 'number') user = await this.get(idOrEntity);
    else user = idOrEntity as UserEntity;

    const res = await this.userRepo.save({
      ...user,
      ...input,
      updateCount: user.updateCount + 1,
    });

    if (withDelay) await sleep(2000);
    if (withFail) throw new InternalServerErrorException();

    return res;
  }
}
