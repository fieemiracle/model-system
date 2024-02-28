import './style.less'
import { useConfig } from '../../context/hooks/useConfig'

function CollapseWrap () {
  const { showSider, setShowSider } = useConfig()

  return (
    <>
      <div className='collapse-wrap'>
        <div className='expand' style={{ display: showSider ? 'block' : 'none' }} onClick={() => setShowSider(false)}></div>
        <div className='collapse' style={{ display: !showSider? 'block' : 'none' }} onClick={() => setShowSider(true)}></div>
      </div>
    </>
  )
}

export default CollapseWrap