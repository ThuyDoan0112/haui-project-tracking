import { format } from 'date-fns'

export function formatDate(date?: Date): string {
  return date ? format(new Date(date), 'dd/MM/yyyy') : ''
}

export function formatISODate(date?: Date): string {
  return date ? format(date, 'yyyy-MM-dd') : ''
}
