import { InputType, Field } from '@nestjs/graphql';
import { IsStrongPassword, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    description:
      "User's unique username (must be longer than 3 characters and less than 36 characters)",
  })
  @Length(3, 36)
  username: string;

  @Field(() => String, { description: "User's password (Must be strong)" })
  @IsStrongPassword()
  password: string;
}
