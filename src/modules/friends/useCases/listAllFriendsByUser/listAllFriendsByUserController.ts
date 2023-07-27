import { Request, Response } from "express";
import { ListAllFriendsByUserUseCase } from "./listAllFriendsByUserUseCase";
import { container } from "tsyringe";

class ListAllFriendsByUserController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;

    const listAllFriendsByUseCase = container.resolve(
      ListAllFriendsByUserUseCase
    );

    const result = await listAllFriendsByUseCase.execute({ usrId });

    return response.status(result.statusCode).json(result);
  }
}

export { ListAllFriendsByUserController };
