import { useEffect, useState } from 'react'
import './App.less'
import { ContextProvider } from './context'
import Footer from './pages/Footer'
import Sider from './pages/Sider'
import { FloatButton } from 'antd'
import { CustomerServiceOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Route, Routes, Navigate, useLocation, Redirect } from 'react-router-dom'

// router pages
import ChatbotPage from "./pages/Chatbot"
import LoginPage from './pages/Login'
import CalendarPage from './pages/Calendar'
import NotePage from './pages/Note'
import TodoPage from './pages/Todo'
import TimelinePage from './pages/Timeline'
import LinkPage from './pages/Link'
import KnowledgePage from './pages/Knowledge'
import SignPage from './pages/Sign'
import PrivacyPage from './pages/Privacy'
import DestoryPage from './pages/Destory'
import RecyclePage from './pages/Recycle'
import FeedbackPage from './pages/Feedback'
import TourPage from './pages/Tour'

// lang config
import dayjs from 'dayjs'
import { isAuthenticated, isUserRole } from './service/auth';

function App() {
  const [light, setLight] = useState(true)
  const [c, setC] = useState(true)
  const { i18n } = useTranslation()
  const location = useLocation()
  const isUserAuthenticated = isAuthenticated()
  const isUser = isUserRole()

  useEffect(() => {
    const lang = c ? 'zh' : 'en'
    i18n.changeLanguage(lang)
    dayjs.locale(c ? 'zh-cn' : 'en-US')
    dayjs.locale()

    // 校验身份
    console.log(isUserAuthenticated, isUser);
    
  }, [c, i18n])

  return (
    <>
      <ContextProvider>
        <div className={`app-wrapper ${ !light ? 'dark' : 'light' }`}>
          <div className={`app-content ${ !light ? 'dark' : 'light' }`}>
            <Sider switchTheme={(dark) => setLight(!dark)}/>
            <Routes>
              {/* Public Routes */}
              <Route path="/tour" element={<TourPage />} />
              <Route path="/calendar" element={<CalendarPage/>} />
              <Route path="/link" element={<LinkPage />} />
              <Route path="/knowledge" element={<KnowledgePage />} />

              { isUserAuthenticated && <Route path="/chat" element={<ChatbotPage />} /> }
              { isUserAuthenticated && <Route path="/login" element={<LoginPage />} /> }
              { isUserAuthenticated && <Route path="/sign" element={<SignPage />} /> }
              { isUserAuthenticated && <Route index element={<Navigate to={location.pathname || '/sign'} />} /> }
              { isUserAuthenticated && isUser && <Route path="/note" element={<NotePage />} />}
              { isUserAuthenticated && isUser && <Route path="/todo" element={<TodoPage />} />}
              { isUserAuthenticated && isUser && <Route path="/timeline" element={<TimelinePage />} />}
              { isUserAuthenticated && isUser && <Route path="/note" element={<NotePage />} />}
              { isUserAuthenticated && isUser && <Route path="/feedback" element={<FeedbackPage />} />}
              { isUserAuthenticated && isUser && <Route path="/privacy" element={<PrivacyPage />} />}
              { isUserAuthenticated && isUser && <Route path="/recycle" element={<RecyclePage />} />}
              { isUserAuthenticated && isUser && <Route path="/destory" element={<DestoryPage />} />}

              {/* Default Route */}
              <Route index element={<Navigate to={location.pathname || '/chat'} />} />
            </Routes>
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
    </>
  )
}

export default App

