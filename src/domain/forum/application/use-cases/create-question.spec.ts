import { describe, expect, it } from 'vitest'

import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  async create(question: Question): Promise<void> {},
}

describe('Create Question Use Case', async () => {
  it('should create a question', async () => {
    const sut = new CreateQuestionUseCase(fakeQuestionsRepository)

    const { question } = await sut.execute({
      authorId: 'fake-author-id',
      content: 'fake-content',
      title: 'fake-title',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toBe('fake-content')
  })
})
