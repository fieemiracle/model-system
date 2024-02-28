import { useState } from 'react'
import './App.less'
import { ContextProvider } from './context'
import ChatbotPage from "./pages/Chatbot"
import Footer from './pages/Footer'
import Sider from './pages/Sider'

function App() {
  const [light, setLight] = useState(true)

  return (
    <ContextProvider>
      <div className={`app-wrapper ${ !light ? 'dark' : 'light' }`}>
        <div className={`app-content ${ !light ? 'dark' : 'light' }`}>
          <Sider switchTheme={(dark) => setLight(!dark)}/>
          <ChatbotPage></ChatbotPage>
        </div>
        <Footer></Footer>
      </div>
    </ContextProvider>
  )
}

export default App
