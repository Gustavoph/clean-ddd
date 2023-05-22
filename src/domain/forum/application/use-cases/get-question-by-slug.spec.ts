import { beforeEach, describe, expect, it } from 'vitest'

import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion({
        title: 'fake-slug',
        slug: Slug.create('fake-slug'),
      }),
    )

    const result = await sut.execute({
      slug: 'fake-slug',
    })

    expect(result.isRight()).toBeTruthy()
  })

  it('should not be able to get a question by slug if not exists', async () => {
    const result = await sut.execute({
      slug: 'fake-content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
