import { ICreateUser, IUser } from "@modules/users/dto/users";

interface IUserRepositories {
  create(user: ICreateUser): Promise<IUser>;
  listByEmail(email: string): Promise<IUser | null>;
}

export { IUserRepositories };
