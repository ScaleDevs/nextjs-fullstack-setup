import { Resolver, Query } from 'type-graphql';
import { User } from './user.objects';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  users(): User[] {
    return [
      {
        id: 'anyy',
        firstName: 'Marco',
        middleName: 'Aguilar',
        lastName: 'Butalid',
        address: 'PH',
        birthday: 'march 14, 1998',
        username: 'mbutalid',
        password: 'asdasd',
      },
    ];
  }
}
