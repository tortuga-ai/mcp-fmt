export type Status = 'backlog' | 'in_progress' | 'completed' | 'blocked' | 'on_hold' | 'syncing' | 'pending' | 'reviewing' | 'archived' | 'cancelled' | 'merged'
export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type Health = 'healthy' | 'down' | 'degraded' | 'warning' | 'unknown'
export type IssueType = 'bug' | 'feature' | 'docs' | 'chore' | 'security' | 'performance' | 'test' | 'refactor'
export type Assignment = 'unassigned' | 'team' | 'automated' | 'owner'

const STATUS_EMOJI: Record<Status, string> = {
  backlog:    '📋',
  in_progress:'🚀',
  completed:  '✅',
  blocked:    '🚫',
  on_hold:    '⏸️',
  syncing:    '🔄',
  pending:    '📤',
  reviewing:  '🔍',
  archived:   '🗑️',
  cancelled:  '❌',
  merged:     '🔀',
}

const PRIORITY_EMOJI: Record<Priority, string> = {
  low:    '🟢',
  medium: '🟡',
  high:   '🔴',
  urgent: '🔥',
}

const HEALTH_EMOJI: Record<Health, string> = {
  healthy:  '🟢',
  down:     '🔴',
  degraded: '🟡',
  warning:  '🟠',
  unknown:  '⬜',
}

const TYPE_EMOJI: Record<IssueType, string> = {
  bug:         '🐛',
  feature:     '✨',
  docs:        '📝',
  chore:       '🔧',
  security:    '🔒',
  performance: '⚡',
  test:        '🧪',
  refactor:    '♻️',
}

const ASSIGNMENT_EMOJI: Record<Assignment, string> = {
  unassigned: '👤',
  team:       '👥',
  automated:  '🤖',
  owner:      '👑',
}

export function statusBadge(status: Status | string): string {
  return STATUS_EMOJI[status as Status] ?? '📋'
}

export function priorityBadge(priority: Priority | string): string {
  return PRIORITY_EMOJI[priority as Priority] ?? '🟡'
}

export function healthBadge(health: Health | string): string {
  return HEALTH_EMOJI[health as Health] ?? '⬜'
}

export function typeBadge(type: IssueType | string): string {
  return TYPE_EMOJI[type as IssueType] ?? '📝'
}

export function assignmentBadge(assignment: Assignment | string): string {
  return ASSIGNMENT_EMOJI[assignment as Assignment] ?? '👤'
}
