import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a answer comment from another person', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('A1'),
    })

    inMemoryAnswerCommentsRepository.create(answerComment)

    expect(
      async () =>
        await sut.execute({
          answerCommentId: answerComment.id.toString(),
          authorId: 'A2',
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
