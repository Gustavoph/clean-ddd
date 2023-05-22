import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Use Case', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should delete a question by id', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('fake-author-id'),
      },
      new UniqueEntityId('fake-question-1'),
    )
    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'fake-author-id',
      questionId: 'fake-question-1',
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })

  it('should not delete a question if the user is not the author of the question ', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('fake-author-id'),
      },
      new UniqueEntityId('fake-question-1'),
    )
    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'fake-another-author-id',
      questionId: 'fake-question-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
