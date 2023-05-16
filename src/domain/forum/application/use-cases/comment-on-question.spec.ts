import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question Use Case', async () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to create a comment question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: 'fake-author-id',
      content: 'fake content',
      questionId: question.id.toString(),
    })

    expect(
      inMemoryQuestionCommentRepository.questionComments[0].content,
    ).toEqual('fake content')
  })

  it('should not be able to create a comment on inexistent question', async () => {
    expect(async () => {
      await sut.execute({
        authorId: 'fake-author-id',
        content: 'fake content',
        questionId: 'fake-question-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
