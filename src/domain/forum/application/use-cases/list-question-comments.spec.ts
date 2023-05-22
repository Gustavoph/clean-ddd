import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ListQuestionCommentsUseCase } from './list-question-comments'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: ListQuestionCommentsUseCase

describe('List Question Comments Use Case', async () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to list question comments', async () => {
    inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('fake-question'),
      }),
    )
    inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('fake-question'),
      }),
    )
    inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('fake-question'),
      }),
    )

    const result = await sut.execute({
      page: 1,
      questionId: 'fake-question',
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to list paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('fake-question'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'fake-question',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
