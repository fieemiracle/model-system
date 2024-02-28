// import 'regenerator-runtime'
import TextArea from 'antd/es/input/TextArea'
import './style.less'
import InputCotainer from '../../components/InputCotainer'
import OutputCotainer from '../../components/OutputCotainer'
import { Button, Empty, message } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import { useConfig } from '../../context/hooks/useConfig'
import generateText from '../../service/generateText'
import { DialogueI } from '../../service/types'
import { useTranslation } from 'react-i18next'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const ChatbotPage = memo(function ChatbotPage(props: { lang: 'zh' | 'en' }) {
  const [promt, setPromt] = useState('')
  const [placeholder, setPlaceholder] = useState('input here...')
  const { isRendering, setIsRendering, list, setList, lidx, setLidx } = useConfig()
  const chatbotContentWrapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const { dark } = useConfig()
  const { t } = useTranslation()
  const [listen, setListen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    if (chatbotContentWrapRef.current) {
      const scrollHeight = chatbotContentWrapRef.current.scrollHeight
      chatbotContentWrapRef.current.scrollTop = scrollHeight
    }
  }, [list])

  useEffect(() => {
    setPromt(transcript)
  }, [transcript])

  const fetchResponse = async () => {
    if (!promt) {
      return
    }
    setLoading(true)

    // 新增
    if (lidx === -1) {
      const newHistory = [
        {
          user_utterance: promt,
          assistant_response: ''
        }
      ]
      let updateList = [
        {
          name: `New Chat ${lidx + 1}`,
          date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          history: newHistory
        }
      ]
      setList(updateList)
      setLidx(0)
      setPromt('')

      const params = {
        history: [], // 历史对话pair
        input: promt, // 用户当前输入的内容
        lang: props.lang
      }
      const data = await generateText(params)
      setLoading(false)
      if (!data.errno) return
      console.log(data)
      const { response } = data
      const lastHistory = [
        {
          user_utterance: promt,
          assistant_response: response
        }
      ]
      updateList = [
        {
          name: `New Chat ${lidx + 1}`,
          date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          history: lastHistory
        }
      ]
      setList(updateList)
    } else {
      const listItem = list[lidx]
      const history = list[lidx].history
      const newHistory = [
        ...history,
        {
          user_utterance: promt,
          assistant_response: ''
        }
      ]
      let updateList = [
        ...list.slice(0, lidx),
        {
          ...listItem,
          history: newHistory
        },
        ...list.slice(lidx + 1)
      ]
      setList(updateList)
      setPromt('')
      
      const params = {
        history, // 历史对话pair
        input: promt, // 用户当前输入的内容
        lang: props.lang
      }
      const data = await generateText(params)
      setLoading(false)
      if (!data.errno) return
      console.log(data)
      const { response } = data
      const lastHistory = [
        ...history,
        {
          user_utterance: promt,
          assistant_response: response
        }
      ]
      updateList = [
        ...list.slice(0, lidx),
        {
          ...listItem,
          history: lastHistory
        },
        ...list.slice(lidx + 1)
      ]
      setList(updateList)
    }
  }

  // 语音识别按钮
  const onRecognise = () => {
    console.log('listening', listening)
    if (!browserSupportsSpeechRecognition) {
      return (
        <>
          {contextHolder}
          <Button onClick={
            messageApi.open({
              type: 'warning',
              content: 'Your browser does not support speech recognition',
            })
          }>Error</Button>
        </>
      )
    }
    setListen(!listen)
    if (listen) {
      SpeechRecognition.startListening
      setPlaceholder('正在进行语音识别...')
    } else {
      SpeechRecognition.stopListening
      setPlaceholder('语音识别暂停中...')
    }
  }

  const clearHistory = () => {
    setIsRendering(false)
    if (lidx === -1) return 
    const updateList = [
      ...list.slice(0, lidx),
      {
        ...(list[lidx]),
        history: []
      },
      ...list.slice(lidx + 1)
    ]
    setList(updateList)
    resetTranscript()
  }

  return (
    <>
      <div className='chatbot-wrapper'>
        {
          list.length ? (
            list.map((_list, _lidx) => (
              <div className={`chatbot-content-wrap ${ dark ? 'dark' : 'light' }`} ref={chatbotContentWrapRef} style={{ display: _lidx === lidx ? 'block' : 'none', border: isRendering || loading ? '1px solid #1677FF' : '1px solid #e5e7eb' }}>
                { 
                  _list.history.map((pair: DialogueI, pidx: number) => (
                    <div className='chatbot-pairs-wrap' key={pidx}>
                      <div className='chatbot-input'>
                        <InputCotainer input={pair.user_utterance}></InputCotainer>
                      </div>
                      <div className='chatbot-output'>
                        <OutputCotainer
                          curPairPos={pidx}
                          output={pair.assistant_response}
                          parentDOm={chatbotContentWrapRef}
                        ></OutputCotainer>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          ) : (
            <div className={`chatbot-content-wrap ${ dark ? 'dark' : 'light' }`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Empty description={false} />
            </div>
          )
        }
        <div className='chatbot-text-wrap'>
          <div className='form-wrap'>
            <TextArea
              placeholder={placeholder}
              className="chatbot-text"
              value={promt}
              style={{ minHeight: 40, maxHeight: 280, background: dark ? '#676767' : '#fff'}}
              onChange={(e) => setPromt(e.target.value)}
            />
            <div className='btn-wrapper'>
              <div>
                <Button type="primary" block onClick={fetchResponse} disabled={loading || isRendering}>{ t('submit') }</Button>
              </div>
              <div>
                <Button type="primary" block danger={listen} onClick={onRecognise}>{ listen ? t('pause') : t('voice') }</Button>
              </div>
              <div>
                <Button type="primary" block onClick={clearHistory}>{ t('clear') }</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default ChatbotPage