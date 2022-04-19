import styled from "@emotion/styled"
import { Diary } from "../types"

interface DiaryItemProps {
  diary: Diary
}

function DiaryItem({
  diary: { author, content, emotion, created_date },
}: DiaryItemProps) {
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
