import styled from "@emotion/styled"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"

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

  const { author, content, emotion } = state

  const handleChangeState = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target

      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    },
    []
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(state)
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
        />
      </div>
      <div>
        <Textarea name="content" value={content} onChange={handleChangeState} />
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
