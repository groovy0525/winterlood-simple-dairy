import styled from "@emotion/styled"
import { Diary } from "../types"
import DiaryItem from "./DiaryItem"

interface DiaryListProps {
  diaryList: Diary[]
  onDelete: (id: number) => void
}

function DiaryList({ diaryList, onDelete }: DiaryListProps) {
  return (
    <Base>
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((diary) => (
          <DiaryItem key={diary.id} diary={diary} onDelete={onDelete} />
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
