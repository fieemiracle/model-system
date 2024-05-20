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

export type Label = 'username' | 'email' | 'phone' | 'gender' | 'password' | 'captcha' | 'avatar' | 'repassword' | 'birth' | 'status'
export type Type = 'input' | 'password' | 'select' | 'phone' | 'captcha' | 'email' | 'number' | 'upload' | 'status'

export type FormI = {
  type: Type
  key: Label,
  label: string
  show: boolean
  value: string
  rules?: Rule[]
  tooltip?: string
  prefix?: ReactNode
  addonBefore?: ReactNode
  dependencies?: string[]
  hasFeedback?: boolean
  extra?: string
  placeholder?: string
}