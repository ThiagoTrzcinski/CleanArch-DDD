import { DomainEvent } from '@/core/events/domain-event'
import { Question } from '../question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export class QuestionBestQuestionChosenEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityId

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id
  }
}
