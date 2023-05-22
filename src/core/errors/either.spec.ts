import { describe, expect, it } from 'vitest'
import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

describe('Either Handling', () => {
  it('success result', () => {
    const result = doSomething(true)

    expect(result.isRight()).toEqual(true)
    expect(result.isLeft()).toEqual(false)
  })

  it('error result', () => {
    const result = doSomething(false)

    expect(result.isRight()).toEqual(false)
    expect(result.isLeft()).toEqual(true)
  })
})
