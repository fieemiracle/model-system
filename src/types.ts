import { Rule } from "antd/es/form"
import { ReactNode } from "react"

export interface DialogueI {
  user_utterance: string
  assistant_response: string
}

export interface ListI {
  name: string
  date: string
  history: DialogueI[]
}

export type Label = 'username' | 'email' | 'phone' | 'gender' | 'password' | 'captcha' | 'avatar' | 'repassword' | 'birth'
export type Type = 'input' | 'password' | 'select' | 'phone' | 'captcha' | 'email' | 'number' | 'upload'

export type FormI = {
  key: Label,
  label: string
  placeholder: string
  show: boolean
  value: string
  rules?: Rule[]
  type?: Type
  tooltip?: string
  prefix?: ReactNode
  addonBefore?: ReactNode
  dependencies?: string[]
  hasFeedback?: boolean
  extra?: string
}