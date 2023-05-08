import { describe, it, expect } from 'vitest'
import { AnswersRepository } from '@repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '@entities/answer'

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
