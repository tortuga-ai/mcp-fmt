import { table, list, nestedList, codeBlock, section, bold, italic, header, keyValue, statusBadge, priorityBadge } from '../src/index'

console.log(header('mcp-fmt Examples', 1))
console.log()

// --- table() with totalRow ---
console.log(header('table() with totalRow', 3))
const taskHeaders = ['Task', 'Owner', 'Status', 'Points']
const taskRows = [
  ['QM-1 Init repo', 'alice', 'done', '3'],
  ['QM-2 Add formatter', 'bob', 'in_progress', '5'],
  ['QM-3 Write tests', 'alice', 'backlog', '2'],
]
console.log(table(taskHeaders, taskRows, ['Total', '', '', '10']))
console.log()

// --- table() with object rows ---
console.log(header('table() with object rows', 3))
console.log(table([
  { id: 'QM-1', title: 'Init repo', status: 'done' },
  { id: 'QM-2', title: 'Add formatter', status: 'in_progress' },
]))
console.log()

// --- statusBadge() + priorityBadge() ---
console.log(header('statusBadge() + priorityBadge()', 3))
console.log(table(
  ['Task', 'Status', 'Priority'],
  [
    ['Fix auth flow',   statusBadge('in_progress'), priorityBadge('urgent')],
    ['Update docs',     statusBadge('backlog'),     priorityBadge('low')],
    ['Deploy to prod',  statusBadge('blocked'),     priorityBadge('high')],
    ['Write tests',     statusBadge('completed'),   priorityBadge('medium')],
  ]
))
console.log()

// --- keyValue() ---
console.log(header('keyValue()', 3))
console.log(keyValue({
  Project: 'qm-web-app',
  Branch: 'main',
  'Triggered by': 'GIT_REF_CHANGE',
  Duration: '12m 46s',
}))
console.log()

// --- list() + nestedList() ---
console.log(header('list() + nestedList()', 3))
console.log(list(['3 tasks total', '1 done', '1 in progress', '1 backlog']))
console.log()
console.log(nestedList([
  { text: 'Frontend', children: ['Fix auth flow', 'Update docs'] },
  { text: 'Backend', children: ['Deploy to prod'] },
  { text: 'QA' },
]))
console.log()

// --- section() ---
console.log(header('section()', 3))
console.log(section(
  'Sprint Summary',
  table(taskHeaders, taskRows, ['Total', '', '', '10']),
  '',
  bold('Velocity: ') + '10 pts',
  italic('Next sync: Friday'),
))
console.log()

// --- codeBlock() ---
console.log(header('codeBlock()', 3))
console.log(codeBlock(
  `import { table, section } from 'mcp-fmt'

return section('Summary', table(headers, rows, totals))`,
  'typescript'
))
