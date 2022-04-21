import { ChangeEvent, FormEvent, useCallback, useState, useRef } from "react"
import styled from "@emotion/styled"

interface initialState {
  author: string
  content: string
  emotion: number
}

function DiaryEditor() {
  const [state, setState] = useState<initialState>({
    author: "",
    content: "",
    emotion: 1,
  })
  const authorRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const { author, content, emotion } = state

  const handleChangeState = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target

      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (author.length < 1) {
      alert("작성자는 최소 1글자 이상 입력해주세요")
      authorRef.current?.focus()
      return
    }

    if (content.length < 5) {
      alert("일기 본문은 최소 5글자 이상 입력해주세요")
      contentRef.current?.focus()
      return
    }

    alert("저장 성공")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>오늘의 일기</h2>
      <div>
        <input
          type="text"
          name="author"
          value={author}
          onChange={handleChangeState}
          ref={authorRef}
        />
      </div>
      <div>
        <Textarea
          name="content"
          value={content}
          onChange={handleChangeState}
          ref={contentRef}
        />
      </div>
      <div>
        <Text>오늘의 감정점수 : </Text>
        <Select name="emotion" value={emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Select>
      </div>
      <div>
        <Button type="submit">일기 저장하기</Button>
      </div>
    </Form>
  )
}

export default DiaryEditor

const Form = styled.form`
  border: 1px solid gray;
  text-align: center;
  padding: 20px;

  input,
  textarea {
    margin-bottom: 20px;
    width: 500px;
    padding: 10px;
  }
`

const Textarea = styled.textarea`
  height: 150px;
`

const Text = styled.span``

const Select = styled.select`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
`

const Button = styled.button`
  width: 500px;
  padding: 10px;
  cursor: pointer;
`
