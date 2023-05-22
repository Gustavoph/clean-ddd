import { beforeEach, describe, expect, it } from 'vitest'

import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should create a question', async () => {
    const result = await sut.execute({
      authorId: 'fake-author-id',
      content: 'fake-content',
      title: 'fake-title',
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryQuestionsRepository.questions[0]).toBe(
      result.value?.question,
    )
  })
})
