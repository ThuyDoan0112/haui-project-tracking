export interface LoginUserDto {
  email: string
  password: string
}

export type Role = 'user' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  studentCode?: string
}

export type CreateUserDto = Pick<
  User,
'email' | 'name' | 'studentCode'
> & {
  password: string
}
