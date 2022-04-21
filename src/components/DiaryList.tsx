import { useContext } from "react"
import styled from "@emotion/styled"
import { DiaryStateContext } from "../contexts/DiaryStateContext"
import DiaryItem from "./DiaryItem"

function DiaryList() {
  const diaryList = useContext(DiaryStateContext)

  return (
    <Base>
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((diary) => (
          <DiaryItem key={diary.id} diary={diary} />
        ))}
      </div>
    </Base>
  )
}

export default DiaryList

const Base = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin-top: 20px;

  > h2 {
    text-align: center;
  }
`
