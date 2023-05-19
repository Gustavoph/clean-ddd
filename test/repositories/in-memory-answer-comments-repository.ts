import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.answerComments.push(answerComment)
  }

  async findManyByAnswerId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = this.answerComments
      .filter(
        (questionComment) => questionComment.answerId.toString() === questionId,
      )
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.answerComments.find(
      (answerComment) => answerComment.id.toString() === id,
    )

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.answerComments.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.answerComments.splice(itemIndex, 1)
  }
}
