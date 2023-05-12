import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find((answer) => answer.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.answers.findIndex((item) => item.id === answer.id)

    this.answers.splice(itemIndex, 1)
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex((a) => a.id === answer.id)

    this.answers[answerIndex] = answer
  }
}
