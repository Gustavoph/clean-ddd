import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { ListQuestionAnswersUseCase } from './list-question-answers'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ListQuestionAnswersUseCase

describe('List Question Answers Use Case', async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
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

    const { answers } = await sut.execute({
      page: 1,
      questionId: 'fake-question',
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to list paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('fake-question'),
        }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'fake-question',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
