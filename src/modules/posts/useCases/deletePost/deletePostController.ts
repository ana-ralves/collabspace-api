import { Request, Response } from "express";
import { DeletePostUseCase } from "./deletePostUseCase";
import { container } from "tsyringe";

class DeletePostController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };

    const deletePostUseCase = container.resolve(DeletePostUseCase);

    const result = await deletePostUseCase.execute({
      usrId,
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { DeletePostController };
