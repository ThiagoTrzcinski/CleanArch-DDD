import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnserQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnserQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnserQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: '42',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
