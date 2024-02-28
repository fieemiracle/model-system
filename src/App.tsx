import { useEffect, useState } from 'react'
import './App.less'
import { ContextProvider } from './context'
import ChatbotPage from "./pages/Chatbot"
import Footer from './pages/Footer'
import Sider from './pages/Sider'
import { FloatButton } from 'antd'
import { CustomerServiceOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

function App() {
  const [light, setLight] = useState(true)
  const [c, setC] = useState(true)
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = c ? 'zh' : 'en'
    i18n.changeLanguage(lang)
  }, [c, i18n])

  return (
    <ContextProvider>
      <div className={`app-wrapper ${ !light ? 'dark' : 'light' }`}>
        <div className={`app-content ${ !light ? 'dark' : 'light' }`}>
          <Sider switchTheme={(dark) => setLight(!dark)}/>
          <ChatbotPage lang={ c ? 'zh' : 'en' }></ChatbotPage>
        </div>
        <div className='tools-wrap'>
          <FloatButton.Group
            trigger="click"
            type="primary"
            style={{ right: 24 }}
            icon={<CustomerServiceOutlined />}
          >
            <FloatButton
              icon={
                <i
                  className={`iconfont ${ c ? 'icon-zhongyingwenqiehuan-zhongwen' : 'icon-zhongyingwenqiehuan-yingwen' }`}
                  style={{ fontSize: '24px', color: c ? '#1677FF' : '#ff6700'}}
                ></i>
              }
              onClick={() => setC(!c)}
            />
          </FloatButton.Group>
        </div>
        <Footer></Footer>
      </div>
    </ContextProvider>
  )
}

export default App
