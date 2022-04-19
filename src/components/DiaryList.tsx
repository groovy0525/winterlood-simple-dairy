import styled from "@emotion/styled"
import { Diary } from "../types"
import DiaryItem from "./DiaryItem"

interface DiaryListProps {
  diaryList: Diary[]
  onRemove: (id: number) => void
  onEdit: (targetId: number, newContent: string) => void
}

function DiaryList({ diaryList, onRemove, onEdit }: DiaryListProps) {
  return (
    <Base>
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((diary) => (
          <DiaryItem
            key={diary.id}
            diary={diary}
            onRemove={onRemove}
            onEdit={onEdit}
          />
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
