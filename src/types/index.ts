export interface Diary {
  id: number
  author: string
  content: string
  emotion: number
  created_date: number
}

export interface ReqDiary extends Omit<Diary, "id" | "created_date"> {}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
