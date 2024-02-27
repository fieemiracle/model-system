import { Avatar } from 'antd'
import './style.less'

type PropsI = {
  input: string
}
function InputComp(props: PropsI) {
  return (
    <>
      <div className='input-wrapper'>
        <div className='input-content'>{ props.input }</div>
        <div className='input-avatar'>
          <Avatar
            size={30}
            style={{
              backgroundColor: '#fde3cf',
              color: '#f56a00'
            }}
          >YOU</Avatar>
        </div>
      </div>
    </>
  )
} 

export default InputComp