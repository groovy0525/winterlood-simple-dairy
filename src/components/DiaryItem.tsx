import { memo, useContext, useRef, useState } from "react"
import styled from "@emotion/styled"
import { Diary } from "../types"
import { DiaryDispatchContext } from "../contexts/DiaryStateContext"

interface DiaryItemProps {
  diary: Diary
}

function DiaryItem({
  diary: { id, author, content, emotion, created_date },
}: DiaryItemProps) {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext)!

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [localContent, setLocalContent] = useState<string>(content)
  const localContentInput = useRef<HTMLTextAreaElement>(null)

  const toggleIsEdit = () => setIsEdit((prev) => !prev)

  const handleQuitEdit = () => {
    setIsEdit(false)
    setLocalContent(content)
  }

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id)
    }
  }

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current?.focus()
      return
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent)
      toggleIsEdit()
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
      <Content>
        {isEdit ? (
          <>
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              ref={localContentInput}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </Content>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </Base>
  )
}

export default memo(DiaryItem)

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
