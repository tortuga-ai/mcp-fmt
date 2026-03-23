import { table } from './table'
import type { Row } from './table'

export function keyValue(data: Row): string {
  const rows = Object.entries(data).map(([k, v]) => [k, v == null ? '' : String(v)])
  return table(['Key', 'Value'], rows)
}
