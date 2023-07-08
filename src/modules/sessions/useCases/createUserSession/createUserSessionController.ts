import { Request, Response } from "express";
import { IRequestCreateUserSession } from "@modules/sessions/dtos/sessions";
import { CreateUserSessionUseCase } from "./createUserSessionUseCase";
import { container } from "tsyringe";

class CreateUserSessionController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body as IRequestCreateUserSession;

    const createUserSessionUseCase = container.resolve(
      CreateUserSessionUseCase
    );

    const result = await createUserSessionUseCase.execute({
      email,
      password,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateUserSessionController };
