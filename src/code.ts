export function codeBlock(code: string, lang = ''): string {
  return `\`\`\`${lang}\n${code}\n\`\`\``
}

export function inlineCode(code: string): string {
  return `\`${code}\``
}
