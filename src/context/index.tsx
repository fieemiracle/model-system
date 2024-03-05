import { ReactNode, createContext, useState } from 'react'
import { FormI, ListI } from '../types'
import { TodoI } from '../pages/Todo'
import { LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

type ContextProviderProps = {
  children: ReactNode
}

type ContextControllerProps = {
  isRendering: boolean
  setIsRendering: (rendering: boolean) => void
  showSider: boolean
  setShowSider: (rendering: boolean) => void
  dark: boolean
  setDark: (rendering: boolean) => void
  list: ListI[]
  setList: (list: ListI[]) => void
  lidx: number
  setLidx: (lidx: number) => void
  todolist: TodoI[]
  setTodolist: (list: TodoI[]) => void
  form: FormI[]
  setForm: (form: FormI[]) => void
}
export const ConfigControllerContext = createContext<ContextControllerProps | null>({
  isRendering: false,
  setIsRendering: () => {},
  showSider: true,
  setShowSider: () => {},
  dark: false,
  setDark: () => {},
  list: [],
  setList: () => {},
  lidx: -1,
  setLidx: () => {},
  todolist: [],
  setTodolist: () => {},
  form: [],
  setForm: () => {}
})

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [isRendering, setIsRendering] = useState(false)
  const [showSider, setShowSider] = useState(true)
  const [dark, setDark] = useState(false)
  const [list, setList] = useState<ListI[]>([])
  const [lidx, setLidx] = useState(-1)
  const [todolist, setTodolist] = useState<TodoI[]>([])
  const { t } = useTranslation()
  const [form, setForm] = useState<FormI[]>([{
    type: 'input',
    label: t('username'),
    key: 'username',
    placeholder: 'Please input your username!',
    show: true,
    value: '',
    rules: [{ required: true, message: 'username is nessesary!!!' }],
    tooltip: 'What do you want others to call you?',
    prefix: (<UserOutlined className='site-form-item-icon' />)
  }, {
    type: 'password',
    label: t('password'),
    key: 'password',
    placeholder: 'Please input your password!',
    show: true,
    hasFeedback: true,
    value: '',
    rules: [{ required: true, message: 'password is nessesary!!!' }],
    tooltip: 'What do you want others to call you?',
    prefix: (<LockOutlined className='site-form-item-icon' />)
  }, {
    type: 'password',
    label: t('repassword'),
    key: 'repassword',
    placeholder: 'Please input your repassword!',
    show: true,
    hasFeedback: true,
    value: '',
    rules: [{
      required: true,
      message: 'repassword is nessesary!!!' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('The new password that you entered do not match!'))
        }
      }
    )],
    tooltip: 'What do you want others to call you?',
    prefix: (<LockOutlined className='site-form-item-icon' />)
  }, {
    type: 'input',
    label: t('phone'),
    key: 'phone',
    placeholder: 'Please input your phone!',
    show: true,
    value: '',
    rules: [{ required: true, message: 'phone is nessesary!!!' }],
    tooltip: 'What do you want others to call you?',
    prefix: (<PhoneOutlined />)
  }, {
    type: 'email',
    label: t('email'),
    key: 'email',
    placeholder: 'Please input your email!',
    show: true,
    value: '',
    tooltip: 'What do you want others to call you?',
    prefix: (<i className='iconfont icon_email'></i>)
  }, {
    type: 'captcha',
    label: t('captcha'),
    key: 'captcha',
    placeholder: 'Please input your captcha!',
    show: true,
    value: '',
    tooltip: 'What do you want others to call you?',
    rules: [{ required: true, message: 'captcha is nessesary!!!' }],
  }, {
    type: 'select',
    label: t('gender'),
    key: 'gender',
    placeholder: 'Please input your gender!',
    show: true,
    value: ''
  }, {
    type: 'upload',
    label: t('avatar'),
    key: 'avatar',
    placeholder: 'Please input your age!',
    show: true,
    value: ''
  }])

  return (
    <ConfigControllerContext.Provider
      value={{
        isRendering, setIsRendering,
        showSider, setShowSider,
        dark, setDark,
        list, setList,
        lidx, setLidx,
        todolist, setTodolist,
        form, setForm
      }}
    >
      {children}
    </ConfigControllerContext.Provider>
  )
}
