import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('A1') },
      new UniqueEntityId('1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'A1',
      title: 'Another title',
      content: 'Another question',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Another title',
      content: 'Another question',
    })
  })
  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('A1') },
      new UniqueEntityId('1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'A2',
      title: 'Another title',
      content: 'Another question',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
