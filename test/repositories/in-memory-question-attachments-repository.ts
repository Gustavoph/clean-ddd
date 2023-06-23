import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public questionAttachments: QuestionAttachment[] = []

  async create(questionAttachments: QuestionAttachment): Promise<void> {
    this.questionAttachments.push(questionAttachments)
  }

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = this.questionAttachments.filter(
      (questionAttachments) =>
        questionAttachments.questionId.toString() === questionId,
    )

    return questionAttachments
  }
}
