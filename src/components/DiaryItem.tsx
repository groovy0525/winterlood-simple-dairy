import styled from "@emotion/styled"
import { Diary } from "../types"

interface DiaryItemProps {
  diary: Diary
  onDelete: (id: number) => void
}

function DiaryItem({
  diary: { id, author, content, emotion, created_date },
  onDelete,
}: DiaryItemProps) {
  const handleDelete = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onDelete(id)
    }
  }

  return (
    <Base>
      <Info>
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <DateTime>{new Date(created_date).toLocaleString()}</DateTime>
      </Info>
      <Content>{content}</Content>
      <button onClick={handleDelete}>삭제하기</button>
    </Base>
  )
}

export default DiaryItem

const Base = styled.div`
  margin-bottom: 10px;
  padding: 20px;
  background-color: rgb(240, 240, 240);
`

const Info = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
`

const DateTime = styled.span`
  color: gray;
`

const Content = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: bold;
`
