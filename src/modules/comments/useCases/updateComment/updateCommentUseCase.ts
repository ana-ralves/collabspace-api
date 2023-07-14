import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestUpdateComment } from "@modules/comments/dtos/comments";
import { ICommentsRepositories } from "@modules/comments/iRepositories/ICommentsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestUpdateComment {
  id: string;
  usrId: string;
}

@injectable()
class UpdateCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentsRepositories,
    @inject("UuidProvider")
    private UuidProvider: IUuidProvider
  ) {}

  async execute({ id, usrId, content }: IRequest): Promise<AppResponse> {
    if (!this.UuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }

    const listCommentById = await this.commentRepository.listById(id);

    if (!listCommentById) {
      throw new AppError({
        message: "Comentário não encontrado!",
      });
    }

    if (usrId !== listCommentById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não permitida!",
      });
    }

    await this.commentRepository.update({
      id,
      content,
    });

    return new AppResponse({
      message: "Comentário editado com sucesso!",
    });
  }
}

export { UpdateCommentUseCase };
