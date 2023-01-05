import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/@generated/user/user.model';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(user: User, createMessageInput: CreateMessageInput) {

    console.log(user)
    
    return this.prisma.message.create({
      data: {
        content: createMessageInput.content,
        author: { connect: { id: user.id } },
      },
    });
  }

  // findAll() {
  //   return `This action returns all messages`;
  // }

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
