import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('A1') },
      new UniqueEntityId('1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: '1',
      authorId: 'A1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('A2') },
      new UniqueEntityId('1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: '1',
      authorId: 'A1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
