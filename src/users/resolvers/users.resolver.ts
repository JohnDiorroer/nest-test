import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UserType } from '../models/user.type';
import { UsersService } from '../services/users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Transactional()
  @Query(() => UserType, { name: 'user' })
  async getUser(@Args({ name: 'id', type: () => Int }) id: number) {
    const res = await this.usersService.get(id);
    if (!res) throw new NotFoundException();
    return res;
  }

  @Transactional()
  @Mutation(() => UserType, { name: 'createUser' })
  async createUser(
    @Args('input')
    input: CreateUserInput,
  ) {
    return this.usersService.create(input);
  }

  @Transactional()
  @Mutation(() => UserType, { name: 'updateUser' })
  async updateUser(
    @Args('input')
    { id, withFail, withDelay, ...other }: UpdateUserInput,
  ) {
    return this.usersService.update(id, other, withFail, withDelay);
  }
}
