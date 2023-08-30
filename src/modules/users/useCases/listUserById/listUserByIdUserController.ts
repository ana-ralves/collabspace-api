import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserByIdUserCase } from "./listUserByIdUseCase";

class ListUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params as { id: string };

    const listUserByUseCase = container.resolve(ListUserByIdUserCase);

    const result = await listUserByUseCase.execute({ id });

    return response.status(result.statusCode).json(result);
  }
}

export { ListUserByIdController };
