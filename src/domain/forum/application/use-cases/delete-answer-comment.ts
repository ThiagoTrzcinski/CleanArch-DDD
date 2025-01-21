import { Either, left, right } from '@/core/either'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new UnauthorizedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
