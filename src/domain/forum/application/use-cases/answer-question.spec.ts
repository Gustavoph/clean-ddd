import { describe, it, expect } from 'vitest'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  async create(answer: Answer): Promise<void> {},
}

describe('Answer Question Use Case', async () => {
  it('should create an answer', async () => {
    const sut = new AnswerQuestionUseCase(fakeAnswersRepository)

    const { answer } = await sut.execute({
      questionId: 'fake-question-id',
      instructorId: 'fake-instructor-id',
      content: 'fake-content',
    })

    expect(answer.content).toBe('fake-content')
  })
})
