import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

// 0:47

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return { answerComments }
  }
}
