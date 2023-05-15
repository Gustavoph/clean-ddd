import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ListRecentQuestionsUseCaseRequest {
  page: number
}

interface ListRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class ListRecentQuestionsUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}
