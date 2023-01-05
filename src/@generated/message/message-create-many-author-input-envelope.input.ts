import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateManyAuthorInput } from './message-create-many-author.input';
import { Type } from 'class-transformer';

@InputType()
export class MessageCreateManyAuthorInputEnvelope {

    @Field(() => [MessageCreateManyAuthorInput], {nullable:false})
    @Type(() => MessageCreateManyAuthorInput)
    data!: Array<MessageCreateManyAuthorInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
