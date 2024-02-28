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