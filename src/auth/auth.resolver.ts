// import { Controller, Request, Post, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('/login')
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
// }

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
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { CreateUserResponse } from 'src/users/dto/create-user.response';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Query(() => CreateUserResponse)
  @UsePipes(new ValidationPipe())
  async login(
    @Args('userLoginInput') userLoginInput: CreateUserInput,
  ): Promise<CreateUserResponse> {
    const validatedUser = await this.authService.validateUser(
      userLoginInput.username,
      userLoginInput.password,
    );

    if (!validatedUser) {
      return {
        success: false,
        error: 'Invaild username/password',
      };
    }

    const userToken = await this.authService.login(validatedUser);

    return {
      success: true,
      user: validatedUser,
      token: userToken.access_token,
    };
  }

  @Mutation(() => CreateUserResponse)
  @UsePipes(new ValidationPipe())
  register(@Args('userCreateInput') userCreateInput: CreateUserInput) {
    return this.usersService.create(userCreateInput);
  }
}
