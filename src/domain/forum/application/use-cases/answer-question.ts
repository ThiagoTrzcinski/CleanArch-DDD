import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnserQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnserQuestionUseCaseResponse {
  answer: Answer
}

export class AnserQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnserQuestionUseCaseRequest): Promise<AnserQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
