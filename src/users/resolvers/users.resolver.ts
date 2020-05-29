import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UserType } from '../models/user.type';
import { UsersService } from '../services/users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserType, { name: 'user' })
  async getUser(@Args({ name: 'id', type: () => Int }) id: number) {
    const res = await this.usersService.get(id);
    if (!res) throw new NotFoundException();
    return res;
  }

  @Mutation(() => UserType, { name: 'createUser' })
  async createUser(
    @Args('input')
    input: CreateUserInput,
  ) {
    return this.usersService.create(input);
  }

  @Mutation(() => UserType, { name: 'updateUser' })
  async updateUser(
    @Args('input')
    { id, withFail, withDelay, ...other }: UpdateUserInput,
  ) {
    return this.usersService.update(id, other, withFail, withDelay);
  }
}
