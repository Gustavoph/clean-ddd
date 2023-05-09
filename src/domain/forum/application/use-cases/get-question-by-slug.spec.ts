import { beforeEach, describe, expect, it } from 'vitest'

import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId('fake-author-id'),
      content: 'fake-content',
      title: 'fake-title',
      slug: Slug.create('fake-content'),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'fake-content',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toBe('fake-content')
  })

  it('should not be able to get a question by slug if not exists', async () => {
    expect(async () => {
      await sut.execute({
        slug: 'fake-content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
