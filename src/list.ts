export function list(items: string[], ordered = false): string {
  return items.map((item, i) => (ordered ? `${i + 1}. ${item}` : `- ${item}`)).join('\n')
}

export function nestedList(items: Array<{ text: string; children?: string[] }>): string {
  return items
    .map(({ text, children }) => {
      const line = `- ${text}`
      if (!children?.length) return line
      return [line, ...children.map((c) => `  - ${c}`)].join('\n')
    })
    .join('\n')
}
