import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { ListQuestionAnswersUseCase } from './list-question-answers'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachaments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ListQuestionAnswersUseCase

describe('List Question Answers Use Case', async () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new ListQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to list question answers', async () => {
    inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('fake-question'),
      }),
    )
    inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('fake-question'),
      }),
    )
    inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('fake-question'),
      }),
    )

    const result = await sut.execute({
      page: 1,
      questionId: 'fake-question',
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to list paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('fake-question'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'fake-question',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
