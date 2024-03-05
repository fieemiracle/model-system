import { DialogueI } from "../types"
import { generate } from "./mock/generate"

type ReqActionParamsT = {
  history: DialogueI[], // 历史对话pair
  input: string, // 用户当前输入的内容
  lang: string
}
type ResStatesResultT = {
  errno: number
  errmsg: string
  response: string
}

const api = process.env.NODE_ENV === 'development' ? '/chat/generate/text' : '/model-system/chat/generate/text'
export default async function generateText (params: ReqActionParamsT): Promise<ResStatesResultT> {
  console.log('generateText----->', params)
  try {
    const res = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    if (!res.ok) {
      // return {
      //   errno: res.status,
      //   errmsg: res.statusText,
      //   generated_token_prob_pairs: [],
      //   topk_token_prob_pairs: []
      // }

      // mock
      const mockData = generate(params.lang)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            errno: res.status,
            errmsg: res.statusText,
            ...mockData
          })
        }, 2000)
      })
    }
    const data = await res.json()
    return data
  } catch (e) {
    if (e instanceof DOMException) {
      return {
        errno: 401,
        errmsg: e.toString(),
        response: ''
      }
    }
    return {
      errno: 401,
      errmsg: 'error',
      response: ''
    }
  }
}