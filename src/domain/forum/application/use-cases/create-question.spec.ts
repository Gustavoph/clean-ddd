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
    const { question } = await sut.execute({
      authorId: 'fake-author-id',
      content: 'fake-content',
      title: 'fake-title',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toBe('fake-content')
  })
})
