import { describe, it, expect, beforeEach } from 'vitest'

import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question Use Case', async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: 'fake-question-id',
      instructorId: 'fake-instructor-id',
      content: 'fake-content',
    })

    expect(answer.content).toBe('fake-content')
  })
})
