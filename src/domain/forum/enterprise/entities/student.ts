import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { Entity } from '@core/entities/entity'

type StudentProps = {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(
      {
        ...props,
      },
      id,
    )

    return student
  }
}
