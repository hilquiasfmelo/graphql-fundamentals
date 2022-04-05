import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../models/User';
import crypto from 'crypto';

@Resolver()
export class UserResolver {
  private data: User[] = [];

  // Busca os dados do usuário
  @Query(() => [User])
  async users() {
    return this.data;
  }

  // Cria um usuário
  @Mutation(() => User)
  async createUser(@Arg('name') name: string, @Arg('email') email: string) {
    const user = { id: crypto.randomUUID(), name, email };

    this.data.push(user);

    return user;
  }
}
