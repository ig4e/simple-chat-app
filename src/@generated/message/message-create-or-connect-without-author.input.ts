import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { Type } from 'class-transformer';
import { MessageCreateWithoutAuthorInput } from './message-create-without-author.input';

@InputType()
export class MessageCreateOrConnectWithoutAuthorInput {

    @Field(() => MessageWhereUniqueInput, {nullable:false})
    @Type(() => MessageWhereUniqueInput)
    where!: MessageWhereUniqueInput;

    @Field(() => MessageCreateWithoutAuthorInput, {nullable:false})
    @Type(() => MessageCreateWithoutAuthorInput)
    create!: MessageCreateWithoutAuthorInput;
}
