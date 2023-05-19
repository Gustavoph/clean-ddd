import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ListAnswerCommentsUseCase } from './list-answer-comments'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: ListAnswerCommentsUseCase

describe('List Answer Comments Use Case', async () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to list answer comments', async () => {
    inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('fake-answer'),
      }),
    )
    inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('fake-answer'),
      }),
    )
    inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('fake-answer'),
      }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: 'fake-answer',
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to list paginated answer answers', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('fake-answer'),
        }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: 'fake-answer',
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
