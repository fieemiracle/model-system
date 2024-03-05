import { useState } from 'react'
import './style.less'
import { Alert, Button, ColorPicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useConfig } from '../../context/hooks/useConfig'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'

export type TodoI = {
  content: string
  date: string
  color: string
  done: boolean
}

function TodoPage () {
  const [newTodo, setNewTodo] = useState('')
  const { dark, todolist, setTodolist } = useConfig()
  const [color, setColor] = useState<string>('#1677ff')
  const location = useLocation()

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const date = dayjs()
      console.log(location.state)
      const update_todolist = [
        ...todolist.slice(),
        {
          content: newTodo,
          date: location.state || `${date.get('year')}/${date.get('month') + 1}/${date.get('date')}`,
          color,
          done: false
        }
      ]
      setTodolist(update_todolist)
      setNewTodo('')
    }
  }

  const removeTodo = (index: number) => {
    const delete_todolist = [
      ...todolist.slice(0, index),
      ...todolist.slice(index + 1)
    ]
    setTodolist(delete_todolist)
  }

  return (
    <>
      <div className='todo-wrap'>
        {/* <div className='title'>Todo List</div> */}
        <div className='list-wrap'>
          {todolist.map((todo, index) => (
            <div key={index}>
              <Alert
                message={
                  <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px'  }}>
                    <div
                      onClick={() => {
                        const curtodo = todolist[index]
                        const update_todolist = [
                          ...todolist.slice(0, index),
                          {
                            ...curtodo,
                            done: !curtodo.done
                          },
                          ...todolist.slice(index + 1),
                        ]
                        setTodolist(update_todolist)
                      }}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <i className={`iconfont ${todo.done ? 'icon-xuanzhong' : 'icon-weixuanzhong1'}`} style={{ fontSize: '20px', color: todo.done ? '#bfbfbf' : '#1f2937' }}></i>
                    </div>
                    <div style={{ fontSize: '19px', color: todo.done? '#bfbfbf' : '#1f2937', textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.content}</div>
                  </div>
                }
                type="warning"
                closable
                onClose={() => removeTodo(index)}
              />
            </div>
          ))}
        </div>
        <div className='form-wrap'>
          <TextArea
              placeholder='New Todo'
              className="chatbot-text"
              value={newTodo}
              style={{ minHeight: 60, maxHeight: 280, background: dark ? '#676767' : '#fff'}}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className='btn-wrapper'>
                <div className='new'>
                  <Button type="primary" block onClick={addTodo}>创建</Button>
                </div>
                <div className='color'>
                  <ColorPicker defaultValue="#1677ff" size="large" onChange={(_color, hex) => setColor(hex)}/>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default TodoPage