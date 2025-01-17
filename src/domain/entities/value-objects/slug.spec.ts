import { expect, it} from 'vitest'
import { Slug } from './slug'

it('should be able to create a slug from text', ()=>{
    const slug = Slug.createFromText('Example question Title')
    expect(slug.value).toEqual('example-question-title')
})