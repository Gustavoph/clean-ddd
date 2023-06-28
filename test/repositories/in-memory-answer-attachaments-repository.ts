import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public answerAttachments: AnswerAttachment[] = []

  async create(answerAttachments: AnswerAttachment): Promise<void> {
    this.answerAttachments.push(answerAttachments)
  }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = this.answerAttachments.filter(
      (answerAttachments) => answerAttachments.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachments = this.answerAttachments.filter(
      (answerAttachments) => answerAttachments.answerId.toString() !== answerId,
    )

    this.answerAttachments = answerAttachments
  }
}
