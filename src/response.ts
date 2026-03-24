export interface McpContent {
  type: 'text'
  text: string
}

export interface McpResponse {
  content: McpContent[]
}

/**
 * Append to your tool's description so AI clients render the output as
 * formatted markdown instead of wrapping it in a code block or summarizing it.
 *
 * @example
 * { name: 'my_tool', description: `List tasks. ${RENDER_HINT}`, ... }
 */
export const RENDER_HINT =
  'Output is pre-formatted markdown. Render it directly as formatted text — do not summarize, paraphrase, or wrap in a code block.'

export function response(text: string): McpResponse {
  return {
    content: [{ type: 'text', text: `[render-hint]: # "${RENDER_HINT}"\n${text}` }],
  }
}
