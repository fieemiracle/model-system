import Mock from 'mockjs'

export const generate = (lang: 'zh' | 'en') => {
  const mockData = Mock.mock({
    response: lang === 'zh' ? Mock.mock('@cparagraph') : Mock.mock('@paragraph')
  })
  return mockData
}