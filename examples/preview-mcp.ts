#!/usr/bin/env bun
/**
 * chat-fmt preview MCP server
 *
 * Add to .cursor/mcp.json or Claude Code MCP settings:
 * {
 *   "mcpServers": {
 *     "chat-fmt-preview": {
 *       "command": "bun",
 *       "args": ["run", "/absolute/path/to/examples/preview-mcp.ts"]
 *     }
 *   }
 * }
 *
 * Then ask your AI: "call the preview tool"
 */

import { table, list, nestedList, codeBlock, section, bold, italic, header, keyValue, statusBadge, priorityBadge, healthBadge, typeBadge, assignmentBadge } from '../src/index'

const output = [
  header('mcp-fmt Examples', 1),
  '',

  header('table() with totalRow', 3),
  table(
    ['Task', 'Owner', 'Status', 'Points'],
    [
      ['QM-1 Init repo',     'alice', 'done',        '3'],
      ['QM-2 Add formatter', 'bob',   'in_progress', '5'],
      ['QM-3 Write tests',   'alice', 'backlog',     '2'],
    ],
    ['Total', '', '', '10']
  ),
  '',

  header('statusBadge()', 3),
  table(
    ['Task', 'Status', 'Priority'],
    [
      ['Fix auth flow',  statusBadge('in_progress'), priorityBadge('urgent')],
      ['Update docs',    statusBadge('reviewing'),   priorityBadge('low')],
      ['Deploy to prod', statusBadge('blocked'),     priorityBadge('high')],
      ['Write tests',    statusBadge('completed'),   priorityBadge('medium')],
      ['Clean up deps',  statusBadge('archived'),    priorityBadge('low')],
      ['Sync data',      statusBadge('syncing'),     priorityBadge('medium')],
      ['Release v2',     statusBadge('pending'),     priorityBadge('high')],
      ['Hotfix #42',     statusBadge('merged'),      priorityBadge('urgent')],
      ['Old feature',    statusBadge('cancelled'),   priorityBadge('low')],
      ['Backlog item',   statusBadge('backlog'),     priorityBadge('medium')],
      ['Paused work',    statusBadge('on_hold'),     priorityBadge('low')],
    ]
  ),
  '',

  header('healthBadge()', 3),
  table(
    ['Service', 'Health', 'Latency'],
    [
      ['api-gateway',  healthBadge('healthy'),  '42ms'],
      ['auth-service', healthBadge('degraded'), '380ms'],
      ['db-primary',   healthBadge('warning'),  '210ms'],
      ['db-replica',   healthBadge('down'),     'timeout'],
      ['cache',        healthBadge('unknown'),  '—'],
    ]
  ),
  '',

  header('typeBadge()', 3),
  table(
    ['Issue', 'Type', 'Assignee'],
    [
      ['QM-10 Login crash',       typeBadge('bug'),         'alice'],
      ['QM-11 Dark mode',         typeBadge('feature'),     'bob'],
      ['QM-12 Update README',     typeBadge('docs'),        'carol'],
      ['QM-13 Upgrade deps',      typeBadge('chore'),       'alice'],
      ['QM-14 SQL injection fix', typeBadge('security'),    'bob'],
      ['QM-15 Slow queries',      typeBadge('performance'), 'carol'],
      ['QM-16 Unit tests',        typeBadge('test'),        'alice'],
      ['QM-17 Extract helpers',   typeBadge('refactor'),    'bob'],
    ]
  ),
  '',

  header('assignmentBadge()', 3),
  table(
    ['Task', 'Assigned To', 'Type'],
    [
      ['Review PR #88',   assignmentBadge('unassigned'), 'manual'],
      ['Deploy staging',  assignmentBadge('automated'),  'ci/cd'],
      ['Q3 planning',     assignmentBadge('team'),       'sync'],
      ['Incident lead',   assignmentBadge('owner'),      'oncall'],
    ]
  ),
  '',

  header('keyValue()', 3),
  keyValue({
    Project:      'qm-web-app',
    Branch:       'main',
    'Triggered by': 'GIT_REF_CHANGE',
    Duration:     '12m 46s',
  }),
  '',

  header('section()', 3),
  section(
    'Sprint Summary',
    table(
      ['Task', 'Owner', 'Status', 'Points'],
      [
        ['QM-1 Init repo',     'alice', statusBadge('completed'),   '3'],
        ['QM-2 Add formatter', 'bob',   statusBadge('in_progress'), '5'],
        ['QM-3 Write tests',   'alice', statusBadge('backlog'),     '2'],
      ],
      ['Total', '', '', '10']
    ),
    '',
    bold('Velocity: ') + '10 pts',
    italic('Next sync: Friday'),
  ),
  '',

  header('list() + nestedList()', 3),
  list(['3 tasks total', '1 done', '1 in progress', '1 backlog']),
  '',
  nestedList([
    { text: 'Frontend', children: ['Fix auth flow', 'Update docs'] },
    { text: 'Backend',  children: ['Deploy to prod'] },
    { text: 'QA' },
  ]),
  '',

  header('codeBlock()', 3),
  codeBlock(
    `import { table, section, statusBadge } from 'mcp-fmt'\n\nreturn section('Summary', table(headers, rows, totals))`,
    'typescript'
  ),
].join('\n')

// MCP stdio protocol
const respond = (id: any, result: any) =>
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n')

const handleMessage = (msg: any) => {
  if (msg.method === 'initialize') {
    respond(msg.id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'chat-fmt-preview', version: '1.0.0' },
    })
  } else if (msg.method === 'tools/list') {
    respond(msg.id, {
      tools: [{
        name: 'preview',
        description: 'Show chat-fmt formatted output examples',
        inputSchema: { type: 'object', properties: {} },
      }],
    })
  } else if (msg.method === 'tools/call' && msg.params?.name === 'preview') {
    respond(msg.id, {
      content: [{ type: 'text', text: output }],
    })
  } else if (msg.method === 'notifications/initialized') {
    // no response needed
  } else if (msg.id !== undefined) {
    respond(msg.id, { content: [{ type: 'text', text: 'Unknown method' }] })
  }
}

let buffer = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  buffer += chunk
  const lines = buffer.split('\n')
  buffer = lines.pop() ?? ''
  for (const line of lines) {
    if (line.trim()) {
      try { handleMessage(JSON.parse(line)) } catch {}
    }
  }
})
