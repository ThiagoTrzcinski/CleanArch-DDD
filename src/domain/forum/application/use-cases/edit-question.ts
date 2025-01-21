import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/questions-repository'
import { UnauthorizedError } from './errors/unauthorized-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new UnauthorizedError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)
    return right({ question })
  }
}
