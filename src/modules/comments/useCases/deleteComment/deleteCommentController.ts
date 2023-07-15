import { Request, Response } from "express";
import { DeleteCommentUseCase } from "./deleteCommentUseCase";
import { container } from "tsyringe";

class DeleteCommentController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id, postId } = request.params as { id: string; postId: string };

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    const result = await deleteCommentUseCase.execute({
      usrId,
      postId,
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { DeleteCommentController };
