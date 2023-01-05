import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { Message } from 'src/@generated/message/message.model';

@ObjectType()
export class PageInfo {
  @Field((type) => Int)
  total: number;
  @Field((type) => Int)
  perPage: number;
  @Field((type) => Int)
  currentPage: number;
  @Field((type) => Int)
  lastPage: number;
  @Field((type) => Boolean)
  hasNextPage: boolean;
}

@ObjectType()
export class MessagesPage {
  @Field((type) => PageInfo)
  pageInfo: PageInfo;
  @Field((type) => [Message])
  messages: Message[];
}
