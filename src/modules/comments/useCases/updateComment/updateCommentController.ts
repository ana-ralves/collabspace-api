import { IRequestUpdateComment } from "@modules/comments/dtos/comments";
import { UpdateCommentUseCase } from "./updateCommentUseCase";
import { container } from "tsyringe";
import { Request, Response } from "express";

class UpdateCommentController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };
    const { content } = request.body as IRequestUpdateComment;

    const updateCommentUseCase = container.resolve(UpdateCommentUseCase);

    const result = await updateCommentUseCase.execute({
      usrId,
      id,
      content,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdateCommentController };
