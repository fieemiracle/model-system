import TextArea from 'antd/es/input/TextArea'
import './style.less'
import InputCotainer from '../../components/InputCotainer'
import OutputCotainer from '../../components/OutputCotainer'
import { Button, Empty } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import { useConfig } from '../../context/hooks/useConfig'
import generateText from '../../service/generateText'
import { DialogueI } from '../../service/types'

const ChatbotPage = memo(function ChatbotPage() {
  const [promt, setPromt] = useState('')
  const { history, setHistory, isRendering, setIsRendering } = useConfig()
  const [historyCache, setHistoryCache] = useState<DialogueI[]>([])
  const chatbotContentWrapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setHistoryCache(history)
  }, [history])

  useEffect(() => {
    if (chatbotContentWrapRef.current) {
      const scrollHeight = chatbotContentWrapRef.current.scrollHeight
      chatbotContentWrapRef.current.scrollTop = scrollHeight
    }
  }, [history])

  const fetchResponse = async () => {
    if (!promt) {
      return
    }
    setLoading(true)
    const newHistory = [
      ...history,
      {
        user_utterance: promt,
        assistant_response: ''
      }
    ]
    setHistory(newHistory)
    setPromt('')

    const filterHistoryCache = historyCache.map((_historyCache) => ({
      user_utterance: _historyCache.user_utterance, assistant_response: _historyCache.assistant_response
    }))
    const params = {
      history: filterHistoryCache, // 历史对话pair
      input: promt, // 用户当前输入的内容
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
    setHistory(lastHistory)
  }

  const clearHistory = () => {
    setIsRendering(false)
    setHistory([])
  }
  return (
    <>
      <div className='chatbot-wrapper'>
        {
          history.length ? (
          <div className='chatbot-content-wrap' ref={chatbotContentWrapRef} style={{ border: isRendering || loading ? '1px solid #1677FF' : '1px solid #e5e7eb' }}>
            { 
              history.map((pair: DialogueI, pidx: number) => (
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
          </div>) : (
            <div className='chatbot-content-wrap' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Empty description={false} />
            </div>
          )
        }
        <div className='chatbot-text-wrap'>
          <div className='form-wrap'>
            <TextArea
              placeholder="input here"
              className="chatbot-text"
              value={promt}
              style={{ minHeight: 40, maxHeight: 280 }}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPromt(e.target.value)}
            />
            <div className='btn-wrapper'>
              <div>
                <Button type="primary" block onClick={fetchResponse} disabled={loading || isRendering}>Submit</Button>
              </div>
              <div>
                <Button type="primary" block onClick={clearHistory}>Clear</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default ChatbotPage