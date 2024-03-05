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
      'pause': 'Pause Speech Recognition',
      'empty': 'A list, a thousand possibilities. Make every day fun by creating a to-do list.',
      'create': 'Create a to-do list',

      // navibar
      'chat': 'Chat',
      'calendar': 'Calendar',
      'note': 'Note',
      'todo': 'Todo',
      'timeline': 'Timeline',
      'link': 'Link',
      'knowledge': 'Knowledge',
      'feedback': 'Feedback',
      'login': 'Login',
      'sign': 'Sign',
      'privacy': 'Privacy',
      'destory': 'Destory',
      'recycle': 'Recycle',
      'tour': 'Tour',

      // form
      'register': 'Register Now',
      'reset': 'Reset Form',
      'modify': 'Modify Now',
      'log': 'Login Now',
      'forget': 'Forget Password'
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
      'pause': '暂停语音识别',
      'empty': '一份清单，千种可能。让每一天都变得有趣，从创建待办事项开始吧！',
      'create': '创建待办事项',

      // navibar
      'chat': '聊天',
      'calendar': '日历',
      'note': '快乐笔记',
      'todo': '待办事项',
      'timeline': '时间线',
      'link': '友情链接',
      'knowledge': '知识库',
      'feedback': '个人反馈',
      'login': '登录',
      'sign': '注册',
      'privacy': '个人资料',
      'destory': '注销账号',
      'recycle': '回收站',
      'tour': '漫游式导航',

      // form
      'register': '立即注册',
      'reset': '重置表单',
      'modify': '立即修改',
      'log': '立即登录',
      'forget': '忘记密码'
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