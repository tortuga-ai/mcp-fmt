import { test, expect, describe } from 'bun:test'
import { table, list, nestedList, codeBlock, inlineCode, header, bold, italic, section } from '../src/index'

describe('table (object rows)', () => {
  test('renders markdown table', () => {
    const result = table([{ name: 'Alice', age: 30 }])
    expect(result).toContain('| name |')
    expect(result).toContain('| Alice |')
    expect(result).toContain('---')
  })

  test('returns empty string for empty array', () => {
    expect(table([])).toBe('')
  })

  test('handles null/undefined values', () => {
    const result = table([{ name: 'Bob', value: null }])
    expect(result).toContain('Bob')
  })
})

describe('table (string arrays)', () => {
  test('renders header and rows', () => {
    const result = table(['Name', 'Score'], [['Alice', '10'], ['Bob', '20']])
    expect(result).toContain('| Name | Score |')
    expect(result).toContain('| --- | --- |')
    expect(result).toContain('| Alice | 10 |')
    expect(result).toContain('| Bob | 20 |')
  })

  test('totalRow wraps values in bold', () => {
    const result = table(
      ['Name', 'Score'],
      [['Alice', '10']],
      ['Total', '10']
    )
    expect(result).toContain('| **Total** | **10** |')
  })

  test('no totalRow when omitted', () => {
    const result = table(['Name'], [['Alice']])
    expect(result).not.toContain('**')
  })

  test('empty rows renders header and divider only', () => {
    const result = table(['Name', 'Score'], [])
    expect(result).toContain('| Name | Score |')
    expect(result).toContain('| --- | --- |')
  })
})

describe('list', () => {
  test('unordered list', () => {
    const result = list(['foo', 'bar'])
    expect(result).toBe('- foo\n- bar')
  })

  test('ordered list', () => {
    const result = list(['foo', 'bar'], true)
    expect(result).toBe('1. foo\n2. bar')
  })
})

describe('nestedList', () => {
  test('renders nested items', () => {
    const result = nestedList([{ text: 'parent', children: ['child1', 'child2'] }])
    expect(result).toContain('- parent')
    expect(result).toContain('  - child1')
  })
})

describe('codeBlock', () => {
  test('wraps in triple backticks', () => {
    expect(codeBlock('const x = 1', 'ts')).toBe('```ts\nconst x = 1\n```')
  })

  test('no language', () => {
    expect(codeBlock('hello')).toBe('```\nhello\n```')
  })
})

describe('inlineCode', () => {
  test('wraps in backticks', () => {
    expect(inlineCode('foo')).toBe('`foo`')
  })
})

describe('text helpers', () => {
  test('header levels', () => {
    expect(header('Hello')).toBe('## Hello')
    expect(header('Hello', 1)).toBe('# Hello')
    expect(header('Hello', 3)).toBe('### Hello')
  })

  test('bold', () => {
    expect(bold('text')).toBe('**text**')
  })

  test('italic', () => {
    expect(italic('text')).toBe('_text_')
  })
})

describe('section', () => {
  test('produces H2 title followed by content', () => {
    const result = section('My Section', 'line one', 'line two')
    expect(result).toBe('## My Section\nline one\nline two')
  })

  test('works with a table block', () => {
    const t = table(['A', 'B'], [['1', '2']])
    const result = section('Summary', t)
    expect(result).toStartWith('## Summary\n')
    expect(result).toContain('| A | B |')
  })

  test('no content args', () => {
    expect(section('Empty')).toBe('## Empty')
  })
})

