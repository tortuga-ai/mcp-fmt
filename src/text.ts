export function header(text: string, level: 1 | 2 | 3 = 2): string {
  return `${'#'.repeat(level)} ${text}`
}

export function bold(text: string): string {
  return `**${text}**`
}

export function italic(text: string): string {
  return `_${text}_`
}
