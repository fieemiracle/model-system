import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'submit': 'Submit',
      'clear': 'Clear History',
      'new': 'New Chat',
      'exit': 'Exit',
      'light': 'light',
      'night': 'dark',
      'download': 'Download',
      'rename': 'Rename',
      'delete': 'Delete',
      'voice': 'Speech To Text',
      'pause': 'Pause Speech Recognition'
    }
  },
  zh: {
    translation: {
      'submit': '提交',
      'clear': '清除历史',
      'new': '新建聊天框',
      'exit': '退出',
      'light': '常规',
      'night': '暗黑',
      'download': '下载',
      'rename': '重命名',
      'delete': '移除',
      'voice': '语音转文字',
      'pause': '暂停语音识别'
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',

    interpolation: {
      escapeValue: false
    }
  })

  export default i18n