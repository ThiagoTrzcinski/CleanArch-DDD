import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('A1') },
      new UniqueEntityId('1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'A1',
      content: 'Another answer',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Another answer',
    })
  })
  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('A1') },
      new UniqueEntityId('1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'A2',
      content: 'Another answer',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
