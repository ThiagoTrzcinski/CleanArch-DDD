import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnserQuestionUseCaseRequest{
    instructorId: string
    questionId: string
    content: string
}

export class AnserQuestionUseCase{
    constructor(private answersRepository: AnswersRepository){}

    async execute({instructorId, questionId, content}: AnserQuestionUseCaseRequest){
        const answer = new Answer({
            content,
            authorId: instructorId,
            questionId
        })

        await this.answersRepository.create(answer)

        return answer
    }
}