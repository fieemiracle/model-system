import { Avatar } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
import './style.less'
import Spinner from '../Spinner'
import { memo, useEffect, useRef, useState } from 'react'
import { useConfig } from '../../context/hooks/useConfig'

type PropsI = {
  output: string
  curPairPos: number
  parentDOm: React.RefObject<HTMLDivElement>
}

const OutputCotainer = memo(function OutputCotainer(props: PropsI) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { setIsRendering } = useConfig()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 >= props.output.length) {
          clearInterval(intervalId)
          setIsRendering(false)
          return prevIndex + 1
        }
        setIsRendering(true)
        return prevIndex + 1
      })

      return () => clearInterval(intervalId)
    }, 50) // 调整更新间隔时间

    return () => clearInterval(intervalId)
  }, [props.output, setIsRendering])

  useEffect(() => {
    if (props.parentDOm.current) {
      const scrollHeight = props.parentDOm.current.scrollHeight
      props.parentDOm.current.scrollTop = scrollHeight + Math.floor(currentIndex / 13) * 22.5
    }
  }, [props.parentDOm, currentIndex])

  return (
    <>
      <div className='output-wrapper'>
        <div className='output-avatar'>
          <Avatar
              size={30}
              style={{
                backgroundColor: '#1677ff'
              }}
              icon={<AntDesignOutlined />}
           ></Avatar>
        </div>
        {
          props.output.length ?
          (
            <div className='output-content' ref={containerRef}>
              {
                new Array(props.output.length).fill(0).map((_item, index) => (
                  <div key={index} className='output' style={{ whiteSpace: 'pre-wrap', width: 'fit-content' }}>{ index <= currentIndex && props.output[index] }</div>
                ))
              }
            </div>
          ) : (<Spinner></Spinner>)
        }
      </div>
    </>
  )
})

export default OutputCotainer