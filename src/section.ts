import { header } from './text'

export function section(title: string, ...content: string[]): string {
  return [header(title, 2), ...content].join('\n')
}
