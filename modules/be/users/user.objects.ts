import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  middleName: string;

  @Field()
  lastName: string;

  @Field()
  birthday: string;

  @Field()
  address: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
