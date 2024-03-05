import { Card } from 'antd'
import './style.less'
import Meta from 'antd/es/card/Meta'

const links = [
  {
    href: 'https://react.dev/',
    img: '/model-system/public/iconfont/react.png',
    name: 'React'
  },
  {
    href: 'https://ts.xcatliu.com/basics/type-of-array.html',
    img: '/model-system/iconfont/failed.png',
    name: 'Vite'
  },
  {
    href: 'https://ant.design/docs/spec/introduce-cn',
    img: '/model-system/iconfont/antd.png',
    name: 'AntdDesign'
  },
  {
    href: 'https://ts.xcatliu.com/basics/type-of-array.html',
    img: '/model-system/iconfont/failed.png',
    name: 'MockJS'
  },
  {
    href: 'https://ts.xcatliu.com/basics/type-of-array.html',
    img: '/model-system/iconfont/typescript.png',
    name: 'Typescript'
  },
  {
    href: 'https://react.i18next.com/guides/quick-start',
    img: '/model-system/iconfont/failed.png',
    name: 'react-i18next'
  },
  {
    href: 'https://ts.xcatliu.com/basics/type-of-array.html',
    img: '/model-system/iconfont/nodejs.png',
    name: 'NodeJS'
  },
  {
    href: 'https://vitejs.cn/',
    img: '/model-system/iconfont/failed.png',
    name: 'Vite App'
  },
  {
    href: 'https://ts.xcatliu.com/basics/type-of-array.html',
    img: '/model-system/iconfont/failed.png',
    name: 'Less'
  },
]
export default function LinkPage () {

  return (
    <>
      <div className='link-wrap'>
        <div className='card-wrap'>
          {
            links.map((link, lidx) => (
              <a key={lidx} className='card' href={link.href} target='_blank' rel='noopener noreferrer'>
               <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={link.name} src={link.img} />}
                >
                  <Meta title={link.name} description="www.instagram.com" />
                </Card>
              </a>
            ))
          }
        </div>
      </div>
    </>
  )
}