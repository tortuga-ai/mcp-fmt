export type Row = Record<string, string | number | boolean | null | undefined>

export function table(headers: string[], rows: string[][], totalRow?: string[]): string
export function table(rows: Row[]): string
export function table(
  headersOrRows: string[] | Row[],
  maybeRows?: string[][],
  totalRow?: string[]
): string {
  if (maybeRows !== undefined) {
    const headers = headersOrRows as string[]
    const lines = [
      `| ${headers.join(' | ')} |`,
      `| ${headers.map(() => '---').join(' | ')} |`,
      ...maybeRows.map((r) => `| ${r.join(' | ')} |`),
      ...(totalRow ? [`| ${totalRow.map((v) => (v ? `**${v}**` : '')).join(' | ')} |`] : []),
    ]
    return lines.join('\n')
  }

  const objRows = headersOrRows as Row[]
  if (objRows.length === 0) return ''
  const headers = Object.keys(objRows[0]!)
  const rows = objRows.map((r) => headers.map((h) => String(r[h] ?? '')))
  return table(headers, rows)
}
