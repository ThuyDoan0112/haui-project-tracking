export interface LoginUserDto {
  email: string
  password: string
}

export type Role = 'user' | 'admin'

export interface User {
  id: number
  email: string
  name: string
  role: Role
  studentCode?: string
}

export type CreateUserDto = Pick<User, 'email' | 'name' | 'studentCode'> & {
  password: string
}

export interface Class {
  id: number
  name: string
  description?: string
  code: string
  teacherId?: number
  teacher?: Pick<User, 'id' | 'name'>
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt?: Date
}

export type ClassStatus = 'active' | 'inactive'

export type CreateClassDto = Pick<
  Class,
  'name' | 'description' | 'code' | 'startDate' | 'endDate' | 'teacherId'
>
