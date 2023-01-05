import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/@generated/message/message.model';

@ObjectType()
export class CreateMessageResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => Message, { nullable: true })
  message?: Message;
  @Field(() => String, { nullable: true })
  error?: string;
}
