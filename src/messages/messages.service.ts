import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/@generated/user/user.model';
import { PageInput } from './dto/page.input';
import { MessagesPage } from './dto/messagesPage.response';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(user: User, createMessageInput: CreateMessageInput) {
    console.log(user);

    return this.prisma.message.create({
      data: {
        content: createMessageInput.content,
        author: { connect: { id: user.id } },
      },
    });
  }

  async findAll(
    pagination: PageInput = { page: 1, perPage: 25 },
  ): Promise<MessagesPage> {
    const totalMessages = await this.prisma.message.count({});
    const currentPage = pagination.page || 1;
    const perPage = (pagination.perPage > 100 ? 100 : pagination.perPage) || 25;
    const offset = (currentPage - 1) * perPage;

    const lastPage = Math.round(totalMessages / perPage);

    const messages = await this.prisma.message.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: offset,
    });

    return {
      pageInfo: {
        total: totalMessages,
        currentPage: currentPage,
        perPage: perPage,
        hasNextPage: lastPage > currentPage,
        lastPage: lastPage,
      },
      messages,
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageInput: UpdateMessageInput) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
