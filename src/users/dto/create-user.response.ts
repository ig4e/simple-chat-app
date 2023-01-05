import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/@generated/user/user.model';

@ObjectType()
export class CreateUserResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => String, { nullable: true })
  error?: string;
}
