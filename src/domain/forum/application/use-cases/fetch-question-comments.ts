import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
