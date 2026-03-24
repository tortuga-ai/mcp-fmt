export interface McpContent {
  type: 'text'
  text: string
}

export interface McpResponse {
  content: McpContent[]
}

export function response(text: string): McpResponse {
  return { content: [{ type: 'text', text }] }
}
