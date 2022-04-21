import { useCallback, useEffect, useMemo, useReducer, useRef } from "react"
import {
  DiaryDispatchContext,
  DiaryStateContext,
} from "./contexts/DiaryStateContext"
import DiaryEditor from "./components/DiaryEditor"
import DiaryList from "./components/DiaryList"
import { Diary, ReqDiary, Comment } from "./types"

type InitAction = {
  type: "INIT"
  payload: Diary[]
}
type CreateAction = {
  type: "CREATE"
  payload: Diary
}
type RemoveAction = {
  type: "REMOVE"
  payload: number
}
type EditAction = {
  type: "REMOVE" | "EDIT"
  payload: {
    targetId: number
    newContent: string
  }
}

type Action = InitAction | CreateAction | RemoveAction | EditAction

const reducer = (state: Diary[], action: Action): Diary[] => {
  switch (action.type) {
    case "INIT":
      return action.payload
    case "CREATE":
      return [action.payload, ...state]
    case "REMOVE":
      return state.filter((diary) => diary.id !== action.payload)
    case "EDIT":
      return state.map((diary) =>
        diary.id === action.payload.targetId
          ? { ...diary, content: action.payload.newContent }
          : diary
      )
    default:
      return state
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, [])
  const dataId = useRef(0)

  const getData = async () => {
    const res: Comment[] = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json())

    const initData: Diary[] = res.slice(0, 20).map((comment: Comment) => ({
      author: comment.email,
      content: comment.body,
      emotion: Math.floor(Math.random() * 5) + 1,
      created_date: new Date().getTime(),
      id: dataId.current++,
    }))

    dispatch({
      type: "INIT",
      payload: initData,
    })
  }

  const onCreate = useCallback(({ author, content, emotion }: ReqDiary) => {
    dispatch({
      type: "CREATE",
      payload: {
        id: dataId.current++,
        author,
        content,
        emotion,
        created_date: new Date().getTime(),
      },
    })
  }, [])

  const onRemove = useCallback((targetId: number) => {
    dispatch({
      type: "REMOVE",
      payload: targetId,
    })
  }, [])

  const onEdit = useCallback((targetId: number, newContent: string) => {
    dispatch({
      type: "EDIT",
      payload: {
        targetId,
        newContent,
      },
    })
  }, [])

  useEffect(() => {
    getData()
  }, [])

  const memoizedDispatches = useMemo(
    () => ({
      onCreate,
      onRemove,
      onEdit,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((diary) => diary.emotion >= 3).length
    const badCount = data.length - goodCount
    const goodRatio = (goodCount / data.length) * 100

    return { goodCount, badCount, goodRatio }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length])

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <DiaryEditor />
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 개수 : {goodCount}</div>
        <div>기분 나쁜 일기 개수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList />
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App
