import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';

@InputType()
export class PageInput {
  @Field((type) => Int, { nullable: true })
  page: number;
  @Field((type) => Int, { nullable: true })
  perPage: number;
}
