export interface Diary {
  id: number
  author: string
  content: string
  emotion: number
  created_date: number
}

export interface ReqDiary extends Omit<Diary, "id" | "created_date"> {}
