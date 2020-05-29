import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  price: number
}
