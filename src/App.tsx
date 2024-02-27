import './App.less'
import { ContextProvider } from './context'
import ChatbotPage from "./pages/Chatbot"
import Footer from './pages/Footer'
import Sider from './pages/Sider'

function App() {

  return (
    <ContextProvider>
      <div className='app-wrapper'>
        <div className='app-content'>
          <Sider/>
          <ChatbotPage></ChatbotPage>
        </div>
        <Footer></Footer>
      </div>
    </ContextProvider>
  )
}

export default App
