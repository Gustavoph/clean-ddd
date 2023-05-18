import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public questionComments: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.questionComments.push(questionComment)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.questionComments.find(
      (questionComment) => questionComment.id.toString() === id,
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.questionComments.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.questionComments.splice(itemIndex, 1)
  }
}
