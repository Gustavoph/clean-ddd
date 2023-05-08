import { describe, expect, it } from 'vitest'
import { Slug } from './slug'

describe('Slug Value Object', () => {
  it('should be able to crate a new slug from text', () => {
    const slug = Slug.createFromText('Example question title')

    expect(slug.value).toBe('example-question-title')
  })
})
