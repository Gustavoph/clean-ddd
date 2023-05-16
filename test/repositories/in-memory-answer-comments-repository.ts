import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.answerComments.push(answerComment)
  }
}
