import { InputType, PickType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(PickType(CreateUserInput, [
  'firstName',
])) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  withFail?: boolean;

  @Field({ nullable: true })
  withDelay?: boolean;
}
