# mcp-fmt

Format MCP tool results into markdown that renders in Claude Code's terminal.

> Built by [Tortuga](https://bytortuga.com)

## Why

MCP tools return raw text. Without formatting, Claude Code displays unreadable walls of data. `mcp-fmt` gives you the markdown primitives that Claude Code's terminal actually renders — tables, lists, headers, code blocks, bold/italic — nothing more, nothing less.

## Screenshots

| Claude Code | Cursor | Codex |
|---|---|---|
| Coming soon | Coming soon | Coming soon |

## Install

```bash
npm install mcp-fmt
# or
bun add mcp-fmt
```

## Usage

### `table(headers, rows, totalRow?)`

Raw string arrays with an optional bold total row.

```ts
import { table } from 'mcp-fmt'

table(
  ['Task', 'Owner', 'Points'],
  [
    ['Init repo',     'alice', '3'],
    ['Add formatter', 'bob',   '5'],
  ],
  ['Total', '', '8']
)
```

### `table(rows)` — object overload

Pass an array of objects and headers are inferred from keys.

```ts
table([
  { id: 'QM-1', title: 'Init repo',     status: 'done'        },
  { id: 'QM-2', title: 'Add formatter', status: 'in_progress' },
])
```

### `section(title, ...content)`

Composes a titled block from a heading and content strings. The core building block for tool responses.

```ts
import { section, table } from 'mcp-fmt'

section(
  'Sprint Summary',
  'By Owner:',
  table(headers, rows, totals),
  '',
  '1 done · 2 in progress'
)
```

### `list(items, ordered?)`

```ts
import { list } from 'mcp-fmt'

list(['Install mcp-fmt', 'Import formatters', 'Return formatted text'])
list(['First', 'Second', 'Third'], true)
```

### `keyValue(data)`

Renders an object as a two-column key/value table.

```ts
import { keyValue } from 'mcp-fmt'

keyValue({ status: 'active', owner: 'alice', points: 8 })
```

### `statusBadge(status)`

```ts
import { statusBadge } from 'mcp-fmt'

statusBadge('completed')   // ✅
statusBadge('in_progress') // 🚀
statusBadge('blocked')     // 🚫
statusBadge('on_hold')     // ⏸️
statusBadge('reviewing')   // 🔍
statusBadge('syncing')     // 🔄
statusBadge('pending')     // 📤
statusBadge('archived')    // 🗑️
statusBadge('cancelled')   // ❌
statusBadge('merged')      // 🔀
```

### `priorityBadge(priority)`

```ts
import { priorityBadge } from 'mcp-fmt'

priorityBadge('low')       // 🟢
priorityBadge('medium')    // 🟡
priorityBadge('high')      // 🔴
priorityBadge('urgent')    // 🔥
```

### `healthBadge(health)`

```ts
import { healthBadge } from 'mcp-fmt'

healthBadge('healthy')     // 🟢
healthBadge('degraded')    // 🟡
healthBadge('warning')     // 🟠
healthBadge('down')        // 🔴
healthBadge('unknown')     // ⬜
```

### `typeBadge(type)`

```ts
import { typeBadge } from 'mcp-fmt'

typeBadge('bug')           // 🐛
typeBadge('feature')       // ✨
typeBadge('docs')          // 📝
typeBadge('chore')         // 🔧
typeBadge('security')      // 🔒
typeBadge('performance')   // ⚡
typeBadge('test')          // 🧪
typeBadge('refactor')      // ♻️
```

### `assignmentBadge(assignment)`

```ts
import { assignmentBadge } from 'mcp-fmt'

assignmentBadge('unassigned') // 👤
assignmentBadge('team')       // 👥
assignmentBadge('automated')  // 🤖
assignmentBadge('owner')      // 👑
```

### `codeBlock(code, lang?)`

```ts
import { codeBlock } from 'mcp-fmt'

codeBlock(`const x = 1`, 'ts')
```

### `header(text, level?)`, `bold(text)`, `italic(text)`

```ts
import { header, bold, italic } from 'mcp-fmt'

header('My Tool')          // ## My Tool
header('My Tool', 1)       // # My Tool
bold('Total: 42')          // **Total: 42**
italic('optional')         // _optional_
```

## Full MCP Tool Example

```ts
import { table, section, bold } from 'mcp-fmt'

server.tool('summary', {}, async () => {
  const headers = ['Task', 'Owner', 'Status', 'Points']
  const rows = [
    ['Init repo',     'alice', 'done',        '3'],
    ['Add formatter', 'bob',   'in_progress', '5'],
    ['Write tests',   'alice', 'backlog',     '2'],
  ]
  const totals = ['Total', '', '', '10']

  return {
    content: [{
      type: 'text',
      text: section(
        'Sprint Summary',
        'By Owner:',
        table(headers, rows, totals),
        '',
        bold('Velocity: ') + '10 pts'
      )
    }]
  }
})
```

## API Reference

| Export | Signature | Description |
| --- | --- | --- |
| `table` | `(headers, rows, totalRow?)` | Markdown table from string arrays; totalRow is bolded |
| `table` | `(rows: Row[])` | Convenience overload — infers headers from object keys |
| `section` | `(title, ...content)` | H2 title + content joined with newlines |
| `list` | `(items, ordered?)` | Unordered or ordered list |
| `nestedList` | `(items)` | Two-level nested list |
| `keyValue` | `(data: Row)` | Object rendered as a key/value table |
| `statusBadge` | `(status)` | Emoji for status values (backlog, in_progress, completed, blocked, on_hold, syncing, pending, reviewing, archived, cancelled, merged) |
| `priorityBadge` | `(priority)` | Emoji for priority values (low, medium, high, urgent) |
| `healthBadge` | `(health)` | Emoji for health/monitoring (healthy, degraded, warning, down, unknown) |
| `typeBadge` | `(type)` | Emoji for issue types (bug, feature, docs, chore, security, performance, test, refactor) |
| `assignmentBadge` | `(assignment)` | Emoji for assignment (unassigned, team, automated, owner) |
| `codeBlock` | `(code, lang?)` | Fenced code block with optional language |
| `inlineCode` | `(code)` | Backtick-wrapped inline code |
| `header` | `(text, level?)` | H1–H3 markdown header (default: H2) |
| `bold` | `(text)` | Bold text |
| `italic` | `(text)` | Italic text |

## Previewing the output

Markdown only renders inside AI chat responses, not in terminal output. To see how your formatting looks, use the bundled preview MCP server.

**1. Clone the repo**

```bash
git clone https://github.com/tortuga-ai/mcp-fmt.git
```

**2. Add to your MCP config**

Claude Code (`~/.claude/mcp.json`):

```json
{
  "mcpServers": {
    "mcp-fmt-preview": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "./examples/preview-mcp.ts"]
    }
  }
}
```

Cursor (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "mcp-fmt-preview": {
      "command": "bun",
      "args": ["run", "./examples/preview-mcp.ts"]
    }
  }
}
```

**3. Restart your AI agent, then ask:** `call the preview tool`

It will render all primitives as markdown in the chat response.

## License

MIT License - see LICENSE for details.

## Author

[Josh Grenon](https://github.com/joshgrenon)

---

![](.github/tortuga.png)
