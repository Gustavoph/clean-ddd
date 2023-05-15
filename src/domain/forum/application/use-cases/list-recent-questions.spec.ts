import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { ListRecentQuestionsUseCase } from './list-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ListRecentQuestionsUseCase

describe('List Recent Questions Use Case', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ListRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to list recent questions', async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 22) }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 22) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to list paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
