import { DialogueI } from "../types"
import { generate } from "./mock/generate"
import axios from 'axios'

type ParamsI = {
    username: string;
    password: string;
    repassword: string;
    phone: number;
    email: string;
    token: string;
    status: 'user' | 'guider';
}
type ResultT = {
  errno: number
  errmsg: string
  data: {
    username: string // 'fieemiracl4e3',
    avatar: string // '',
    expiretime: number // 1716235534,
    token: string
  }

}

// const api = process.env.NODE_ENV === 'development' ? '/chat/generate/text' : '/model-system/chat/generate/text'
export default async function gotoSign (params: ParamsI): Promise<ResultT> {
//   console.log('gotoSign----->', params)
  const {token} = params
  const paramsServer = JSON.parse(JSON.stringify(params))
  delete paramsServer.token
  try {
    const res = await axios({
        url: '/server/sign',
        method: 'POST',
        data: paramsServer,
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
    console.log('res===========>', res);
    const { status, statusText, data } = res
    return data
  } catch (e) {
    if (e instanceof DOMException) {
      return {
        errno: 401,
        errmsg: e.toString(),
        data: {}
      }
    }
    return {
      errno: 401,
      errmsg: 'error',
      data
    }
  }
}