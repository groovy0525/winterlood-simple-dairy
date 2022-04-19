import DiaryEditor from "./components/DiaryEditor"
import DiaryList from "./components/DiaryList"
import { Diary } from "./types"

const dummyList: Diary[] = [
  {
    id: 1,
    author: "이정환",
    content: "하이 1",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "홍길동",
    content: "하이 2",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "아무개",
    content: "하이 3",
    emotion: 1,
    created_date: new Date().getTime(),
  },
]

function App() {
  return (
    <>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </>
  )
}

export default App
