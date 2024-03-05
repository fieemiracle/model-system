import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { BrowserRouter as Router } from 'react-router-dom'
import 'dayjs/locale/zh-cn'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename='/model-system'>
      <App />
    </Router>

  </React.StrictMode>,
)
