import { table, list, nestedList, codeBlock, section, bold, italic, header, keyValue, statusBadge, priorityBadge } from '../src/index'

const output = [
  header('chat-fmt Examples', 1),
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

  header('statusBadge() + priorityBadge()', 3),
  table(
    ['Task', 'Status', 'Priority'],
    [
      ['Fix auth flow',  statusBadge('in_progress'), priorityBadge('urgent')],
      ['Update docs',    statusBadge('backlog'),     priorityBadge('low')],
      ['Deploy to prod', statusBadge('blocked'),     priorityBadge('high')],
      ['Write tests',    statusBadge('completed'),   priorityBadge('medium')],
    ]
  ),
  '',

  header('keyValue()', 3),
  keyValue({
    Project: 'qm-web-app',
    Branch: 'main',
    'Triggered by': 'GIT_REF_CHANGE',
    Duration: '12m 46s',
  }),
  '',

  header('section()', 3),
  section(
    'Sprint Summary',
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
    `import { table, section } from 'chat-fmt'\n\nreturn section('Summary', table(headers, rows, totals))`,
    'typescript'
  ),
].join('\n')

Bun.serve({
  port: 3333,
  fetch() {
    return new Response(output, { headers: { 'Content-Type': 'text/plain' } })
  },
})

console.log('Preview server running at http://localhost:3333')
console.log('Ask your AI agent: "fetch http://localhost:3333 and show me the response"')
