import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateWithoutAuthorInput } from './message-create-without-author.input';
import { Type } from 'class-transformer';
import { MessageCreateOrConnectWithoutAuthorInput } from './message-create-or-connect-without-author.input';
import { MessageCreateManyAuthorInputEnvelope } from './message-create-many-author-input-envelope.input';
import { MessageWhereUniqueInput } from './message-where-unique.input';

@InputType()
export class MessageCreateNestedManyWithoutAuthorInput {

    @Field(() => [MessageCreateWithoutAuthorInput], {nullable:true})
    @Type(() => MessageCreateWithoutAuthorInput)
    create?: Array<MessageCreateWithoutAuthorInput>;

    @Field(() => [MessageCreateOrConnectWithoutAuthorInput], {nullable:true})
    @Type(() => MessageCreateOrConnectWithoutAuthorInput)
    connectOrCreate?: Array<MessageCreateOrConnectWithoutAuthorInput>;

    @Field(() => MessageCreateManyAuthorInputEnvelope, {nullable:true})
    @Type(() => MessageCreateManyAuthorInputEnvelope)
    createMany?: MessageCreateManyAuthorInputEnvelope;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    connect?: Array<MessageWhereUniqueInput>;
}
