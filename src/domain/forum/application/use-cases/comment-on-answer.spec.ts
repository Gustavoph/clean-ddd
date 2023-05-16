import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer Use Case', async () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able to create a comment answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: 'fake-author-id',
      content: 'fake content',
      answerId: answer.id.toString(),
    })

    expect(inMemoryAnswerCommentRepository.answerComments[0].content).toEqual(
      'fake content',
    )
  })

  it('should not be able to create a comment on inexistent answer', async () => {
    expect(async () => {
      await sut.execute({
        authorId: 'fake-author-id',
        content: 'fake content',
        answerId: 'fake-answer-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
