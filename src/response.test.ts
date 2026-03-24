import { test, expect } from 'bun:test'
import { response } from './response'

test('response wraps text in MCP content format', () => {
  const result = response('hello world')
  expect(result).toEqual({
    content: [{ type: 'text', text: 'hello world' }],
  })
})

test('response content array has exactly one item', () => {
  const result = response('test')
  expect(result.content).toHaveLength(1)
})

test('response type is always "text"', () => {
  const result = response('test')
  expect(result.content[0].type).toBe('text')
})

test('response preserves multiline text', () => {
  const text = '# Header\n\n- item 1\n- item 2'
  const result = response(text)
  expect(result.content[0].text).toBe(text)
})
