import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestCreateUserSession } from "@modules/sessions/dtos/sessions";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IBcryptProvider } from "@shared/container/providers/bcryptProvider/IBcryptProvider";

@injectable()
class CreateUserSessionUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("BcryptProvider")
    private bcryptProvider: IBcryptProvider
  ) {}

  async execute({
    email,
    password,
  }: IRequestCreateUserSession): Promise<AppResponse> {
    const listUserByEmail = await this.userRepository.listByEmail(email);

    console.log(listUserByEmail);

    if (!listUserByEmail) {
      throw new AppError({
        message: "E-mail ou senha incorretos!",
      });
    }

    const passwordMatch = await this.bcryptProvider.checkPassword(
      password,
      listUserByEmail.password
    );

    if (!passwordMatch) {
      throw new AppError({
        message: "E-mail ou senha incorretos!",
      });
    }

    if (!listUserByEmail.active) {
      throw new AppError({
        message: "Usuário inativo!",
      });
    }

    const tokenPayload = {
      id: listUserByEmail.id,
    };

    const token = sign({ tokenPayload }, process.env.JWT_SECRET_TOKEN, {
      subject: listUserByEmail.email,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return new AppResponse({
      message: "Usuário logado com sucesso!",
      data: {
        token,
        user: {
          id: listUserByEmail.id,
          name: listUserByEmail.name,
          email: listUserByEmail.email,
          telephone: listUserByEmail.telephone,
          birthDate: listUserByEmail.birth_date,
          avatarUrl: listUserByEmail.avatar_url,
          createdAt: listUserByEmail.created_at,
        },
      },
    });
  }
}

export { CreateUserSessionUseCase };
