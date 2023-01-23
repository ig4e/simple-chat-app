import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { UserWhereUniqueInput } from 'src/@generated/user/user-where-unique.input';
import { UserWhereInput } from 'src/@generated/user/user-where.input';
import { PrismaService } from 'src/prisma.service';

import * as bcrypt from 'bcrypt';
import { bcryptConstants } from 'src/constants';
import { CreateUserResponse } from './dto/create-user.response';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}
  async create(userCreateInput: UserCreateInput): Promise<CreateUserResponse> {
    try {
      const { username, password } = userCreateInput;
      const hashedPassword = await bcrypt.hash(
        password,
        bcryptConstants.saltRounds,
      );
      const user = await this.prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });

      return {
        success: true,
        user,
        token: (await this.authService.login(user)).access_token,

      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          return {
            success: false,
            error: 'username already used, Try Another',
          };
        }
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.user.findMany({ include: { _count: true } });
  }

  findOne(userWhereInput: UserWhereInput) {
    return this.prisma.user.findFirst({ where: userWhereInput });
  }

  update(
    userWhereUniqueInput: UserWhereUniqueInput,
    userUpdateInput: UserUpdateInput,
  ) {
    return this.prisma.user.update({
      where: userWhereUniqueInput,
      data: userUpdateInput,
    });
  }

  remove(userWhereUniqueInput: UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where: userWhereUniqueInput,
    });
  }

  getMessages(userId: number) {
    return this.prisma.message.findMany({ where: { authorId: userId } });
  }
}
