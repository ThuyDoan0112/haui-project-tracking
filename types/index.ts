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

export type CreateUserDto = Pick<User, 'email' | 'name'> & {
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

export interface Document {
  id: number
  name: string
  description?: string
  path: string
}

export interface UploadDocumentsResponse {
  count: number
}

export interface UploadDocumentDto {
  documents?: FileList
}

export interface DocumentsOnClasses {
  classId: number
  documentId: number
  document: Document
}

export interface Project {
  id: number
  name: string
  description?: string
}

export interface UsersOnClasses {
  classId: number
  userId: number
  projectId: number
  project: Project
}

export interface UploadStudentsDto {
  sheet?: File
}
