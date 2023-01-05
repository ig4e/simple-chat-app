import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MessageCreateWithoutAuthorInput } from './message-create-without-author.input';
import { Type } from 'class-transformer';
import { MessageCreateOrConnectWithoutAuthorInput } from './message-create-or-connect-without-author.input';
import { MessageUpsertWithWhereUniqueWithoutAuthorInput } from './message-upsert-with-where-unique-without-author.input';
import { MessageCreateManyAuthorInputEnvelope } from './message-create-many-author-input-envelope.input';
import { MessageWhereUniqueInput } from './message-where-unique.input';
import { MessageUpdateWithWhereUniqueWithoutAuthorInput } from './message-update-with-where-unique-without-author.input';
import { MessageUpdateManyWithWhereWithoutAuthorInput } from './message-update-many-with-where-without-author.input';
import { MessageScalarWhereInput } from './message-scalar-where.input';

@InputType()
export class MessageUpdateManyWithoutAuthorNestedInput {

    @Field(() => [MessageCreateWithoutAuthorInput], {nullable:true})
    @Type(() => MessageCreateWithoutAuthorInput)
    create?: Array<MessageCreateWithoutAuthorInput>;

    @Field(() => [MessageCreateOrConnectWithoutAuthorInput], {nullable:true})
    @Type(() => MessageCreateOrConnectWithoutAuthorInput)
    connectOrCreate?: Array<MessageCreateOrConnectWithoutAuthorInput>;

    @Field(() => [MessageUpsertWithWhereUniqueWithoutAuthorInput], {nullable:true})
    @Type(() => MessageUpsertWithWhereUniqueWithoutAuthorInput)
    upsert?: Array<MessageUpsertWithWhereUniqueWithoutAuthorInput>;

    @Field(() => MessageCreateManyAuthorInputEnvelope, {nullable:true})
    @Type(() => MessageCreateManyAuthorInputEnvelope)
    createMany?: MessageCreateManyAuthorInputEnvelope;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    set?: Array<MessageWhereUniqueInput>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    disconnect?: Array<MessageWhereUniqueInput>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    delete?: Array<MessageWhereUniqueInput>;

    @Field(() => [MessageWhereUniqueInput], {nullable:true})
    @Type(() => MessageWhereUniqueInput)
    connect?: Array<MessageWhereUniqueInput>;

    @Field(() => [MessageUpdateWithWhereUniqueWithoutAuthorInput], {nullable:true})
    @Type(() => MessageUpdateWithWhereUniqueWithoutAuthorInput)
    update?: Array<MessageUpdateWithWhereUniqueWithoutAuthorInput>;

    @Field(() => [MessageUpdateManyWithWhereWithoutAuthorInput], {nullable:true})
    @Type(() => MessageUpdateManyWithWhereWithoutAuthorInput)
    updateMany?: Array<MessageUpdateManyWithWhereWithoutAuthorInput>;

    @Field(() => [MessageScalarWhereInput], {nullable:true})
    @Type(() => MessageScalarWhereInput)
    deleteMany?: Array<MessageScalarWhereInput>;
}
