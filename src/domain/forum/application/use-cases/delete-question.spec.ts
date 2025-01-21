import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('A1') },
      new UniqueEntityId('1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: '1',
      authorId: 'A1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('A1') },
      new UniqueEntityId('Q1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'Q1',
      authorId: 'A2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
