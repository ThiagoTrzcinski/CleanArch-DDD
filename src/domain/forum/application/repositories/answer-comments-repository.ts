import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

export interface AnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(answer: AnswerComment): Promise<void>
  delete(answer: AnswerComment): Promise<void>
  findManyByAnswerId(
    answersId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
}
