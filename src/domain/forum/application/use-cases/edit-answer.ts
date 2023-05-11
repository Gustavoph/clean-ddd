import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    content,
    answerId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!question) throw new Error('Question not found.')

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {}
  }
}
