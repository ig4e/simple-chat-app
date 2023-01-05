import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Message } from 'src/@generated/message/message.model';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { UserWhereUniqueInput } from 'src/@generated/user/user-where-unique.input';
import { UserWhereInput } from 'src/@generated/user/user-where.input';
import { User } from 'src/@generated/user/user.model';
import { CurrentUser, GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { CreateUserResponse } from './dto/create-user.response';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return this.usersService.findOne({ id: { equals: user.id } });
  }

  @Mutation(() => CreateUserResponse)
  @UsePipes(new ValidationPipe())
  createUser(@Args('userCreateInput') userCreateInput: CreateUserInput) {
    return this.usersService.create(userCreateInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('userWhereInput') userWhereInput: UserWhereInput) {
    return this.usersService.findOne(userWhereInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('userWhereUniqueInput') userWhereUniqueInput: UserWhereUniqueInput,
    @Args('userUpdateInput') userUpdateInput: UserUpdateInput,
  ) {
    return this.usersService.update(userWhereUniqueInput, userUpdateInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('userWhereUniqueInput') userWhereUniqueInput: UserWhereUniqueInput,
  ) {
    return this.usersService.remove(userWhereUniqueInput);
  }

  @ResolveField(() => [Message])
  messages(@Parent() user: User) {
    return this.usersService.getMessages(user.id);
  }
}
