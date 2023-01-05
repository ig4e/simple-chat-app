import { Injectable } from '@nestjs/common';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { UserWhereUniqueInput } from 'src/@generated/user/user-where-unique.input';
import { UserWhereInput } from 'src/@generated/user/user-where.input';
import { PrismaService } from 'src/prisma.service';

import * as bcrypt from 'bcrypt';
import { bcryptConstants } from 'src/auth/constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(userCreateInput: UserCreateInput) {
    const { username, password } = userCreateInput;
    const hashedPassword = await bcrypt.hash(password, bcryptConstants.saltRounds);

    return this.prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
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
