import { useEffect, useRef, useState } from "react"
import DiaryEditor from "./components/DiaryEditor"
import DiaryList from "./components/DiaryList"
import { Diary, ReqDiary, Comment } from "./types"

function App() {
  const [data, setData] = useState<Diary[]>([])
  const dataId = useRef(0)

  const getData = async () => {
    const res: Comment[] = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json())

    const initData: Diary[] = res.slice(0, 20).map((comment: Comment) => ({
      author: comment.email,
      content: comment.body,
      emotion: Math.floor(Math.random() * 5) + 1,
      created_date: new Date().getTime(),
      id: dataId.current++,
    }))

    setData(initData)
  }

  const onCreate = ({ author, content, emotion }: ReqDiary) => {
    setData((prevData) => [
      {
        id: dataId.current++,
        author,
        content,
        emotion,
        created_date: new Date().getTime(),
      },
      ...prevData,
    ])
  }

  const onRemove = (targetId: number) => {
    setData((prevData) => prevData.filter((data) => data.id !== targetId))
  }

  const onEdit = (targetId: number, newContent: string) => {
    setData((prevData) =>
      prevData.map((data) =>
        data.id === targetId ? { ...data, content: newContent } : data
      )
    )
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </>
  )
}

export default App
