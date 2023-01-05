import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { Type } from 'class-transformer';
import { MessageUpdateWithoutAuthorInput } from './message-update-without-author.input';

@InputType()
export class MessageUpdateWithWhereUniqueWithoutAuthorInput {

    @Field(() => MessageWhereUniqueInput, {nullable:false})
    @Type(() => MessageWhereUniqueInput)
    where!: MessageWhereUniqueInput;

    @Field(() => MessageUpdateWithoutAuthorInput, {nullable:false})
    @Type(() => MessageUpdateWithoutAuthorInput)
    data!: MessageUpdateWithoutAuthorInput;
}
