import { Button, GetProp, Modal, Switch, Upload, UploadFile, UploadProps } from 'antd'
import './style.less'
import { useEffect, useState } from 'react'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import CollapseWrap from '../../components/Collapse'
import { useConfig } from '../../context/hooks/useConfig'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
type InfoI = {
  uid: string
  name: string
  url: string
  status: string
  thumbUrl: string
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
  
function Sider (props: { switchTheme: (dark: boolean) => void }) {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile<InfoI>[]>([])
    const { showSider, dark, setDark } = useConfig()

    useEffect(() => {
      props.switchTheme(dark)
    }, [dark, props])
    const handleCancel = () => setPreviewOpen(false)

    const handlePreview = async (file: UploadFile) => {
      console.log(file)
      let src = file.thumbUrl as string
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(file.originFileObj as FileType)
          reader.onload = () => resolve(reader.result as string)
        })
      }
      const image = new Image()
      image.src = src
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType)
      }
      setPreviewImage(file.url || (file.preview as string))
      setPreviewOpen(true)
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    }

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined style={{ color: dark ? '#fff' : '#1f2937' }}/>
      </button>
    )

  return (
    <>
      <div className={`sider-wrap ${dark ? 'dark' : 'light'}`} style={{ background: dark ? '#2f2f2f' : '#fff' }}>
        <div className='main' style={{ display: showSider ? 'flex' : 'none', transition: 'all 3s' }}>
          <div className="title-wrap">
            <div className='logo-wrap'>
              <div className='logo'><i className='iconfont icon-zhinengxuexipingtai'></i></div>
              <div className='name'>Robot System</div>
            </div>
            <div className='theme-wrap'>
              <Switch checkedChildren="白天" unCheckedChildren="黑夜" defaultChecked onClick={(checked) => setDark(!checked)}/>
            </div>
          </div>
          <div className="list-container">
            <div className='new-wrap'>
              <div className='new'>新建聊天框</div>
              <div className='btn'>
                <Button type="primary" icon={<PlusOutlined />} size='small'></Button>
              </div>
            </div>
            <div className='list-wrap'>
              <div className='list-item'>
                <div className='file-name'>File Chat</div>
                <div className='more'>
                  <EllipsisOutlined />
                </div>
              </div>
              <div className='list-item'>
                <div className='file-name'>File Chat</div>
                <div className='more'>
                  <EllipsisOutlined />
                </div>
              </div>
              <div className='list-item'>
                <div className='file-name'>File Chat</div>
                <div className='more'>
                  <EllipsisOutlined />
                </div>
              </div>
            </div>
          </div>
          <div className="user-wrap">
            <div className='avatar'>
              <ImgCrop cropShape="round" rotationSlider>
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  maxCount={1}
                  className="upload"
                >
                  { fileList.length ? null : uploadButton }
                </Upload>
              </ImgCrop>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
            <div className='username'>User</div>
            <div className='logout'>退出</div>
          </div>
        </div>
        <div className='tool' style={{ marginLeft: !showSider ? '6px' : '3px' }}>
          <CollapseWrap></CollapseWrap>
        </div>
      </div>
    </>
  )
}

export default Sider