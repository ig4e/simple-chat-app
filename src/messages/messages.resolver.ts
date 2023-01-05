import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Message } from 'src/@generated/message/message.model';
import { User } from 'src/@generated/user/user.model';
import { CurrentUser, GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateMessageInput } from './dto/create-message.input';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  pubSub: PubSub;
  constructor(
    private readonly messagesService: MessagesService,
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {
    this.pubSub = new PubSub();
  }

  @Subscription(() => Message)
  messageCreated() {
    return this.pubSub.asyncIterator('messageCreated');
  }

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @CurrentUser() user: User,
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    const message = await this.messagesService.create(user, createMessageInput);
    this.pubSub.publish('messageCreated', { messageCreated: message });
    return message;
  }

  @ResolveField(() => User, { name: 'author' })
  getAuthor(@Parent() message: Message) {
    return this.usersService.findOne({ id: { equals: message.authorId } });
  }

  // @Query(() => [Message], { name: 'messages' })
  // findAll() {
  //   return this.messagesService.findAll();
  // }

  // @Query(() => Message, { name: 'message' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.messagesService.findOne(id);
  // }

  // @Mutation(() => Message)
  // updateMessage(@Args('updateMessageInput') updateMessageInput: UpdateMessageInput) {
  //   return this.messagesService.update(updateMessageInput.id, updateMessageInput);
  // }

  // @Mutation(() => Message)
  // removeMessage(@Args('id', { type: () => Int }) id: number) {
  //   return this.messagesService.remove(id);
  // }
}
