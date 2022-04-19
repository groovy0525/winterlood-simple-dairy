import { useRef, useState } from "react"
import DiaryEditor from "./components/DiaryEditor"
import DiaryList from "./components/DiaryList"
import { Diary, ReqDiary } from "./types"

function App() {
  const [data, setData] = useState<Diary[]>([])
  const dataId = useRef(0)

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

  const onDelete = (id: number) => {
    setData((prevData) => prevData.filter((data) => data.id !== id))
  }

  return (
    <>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} />
    </>
  )
}

export default App
