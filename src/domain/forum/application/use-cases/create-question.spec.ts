import { beforeEach, describe, expect, it } from 'vitest'

import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

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
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryQuestionsRepository.questions[0]).toBe(
      result.value?.question,
    )
    expect(inMemoryQuestionsRepository.questions[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionsRepository.questions[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
