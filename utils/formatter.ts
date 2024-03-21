import { format } from 'date-fns'

export function formatDate(date?: Date): string {
  if (!date)
    return ''

  return format(date, 'dd/MM/yyyy')
}
