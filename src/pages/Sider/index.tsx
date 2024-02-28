import { Button, GetProp, Modal, Popover, Switch, Upload, UploadFile, UploadProps } from 'antd'
import './style.less'
import { useEffect, useState } from 'react'
import { PlusOutlined, EllipsisOutlined, DownloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import CollapseWrap from '../../components/Collapse'
import { useConfig } from '../../context/hooks/useConfig'
import { useTranslation } from 'react-i18next'
import TextArea from 'antd/es/input/TextArea'

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
    const { showSider, dark, setDark, list, setList, lidx, setLidx } = useConfig()
    const { t } = useTranslation()
    const [editable, setEditable] = useState(false)

    useEffect(() => {
      props.switchTheme(dark)
    }, [dark, props])
    const handleCancel = () => setPreviewOpen(false)

    const handlePreview = async (file: UploadFile) => {
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
    
    const newChat = () => {
      const updateList = [
        {
          name: `New Chat`,
          date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          history: []
        },
        ...list
      ]
      setLidx(0)
      setList(updateList)
    }
    
    const onDelete = (_lindex: number) => {
      const updateList = [
        ...list.slice(0, _lindex),
        ...list.slice(_lindex + 1)
      ]
      setList(updateList)
    }
    const onDownload = (_lindex: number) => {
      const listItem = list[_lindex]
      console.log(listItem)
    }

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
              <Switch checkedChildren={ t('light') } unCheckedChildren={ t('night') } defaultChecked onClick={(checked) => setDark(!checked)}/>
            </div>
          </div>
          <div className="list-container">
            <div className='new-wrap'>
              <div className='new'>{ t('new') }</div>
              <div className='btn'>
                <Button type="primary" icon={<PlusOutlined />} size='small' onClick={newChat}></Button>
              </div>
            </div>
            <div className='list-wrap'>
              {
                list.map((_litem, _lindex) => (
                  <div className='list-item' key={_lindex} onClick={() => setLidx(_lindex)} style={{ background: _lindex === lidx ? '#e5e7eb' : '#fff' }}>
                    {
                      editable ? (
                        <TextArea
                          placeholder='input here'
                          value={_litem.name}
                          allowClear
                          autoSize={{ minRows: 1, maxRows: 3 }}
                          style={{ background: dark ? '#676767' : '#fff', color: '12px'}}
                          onChange={(e) => {
                            const updateList = [
                              ...list.slice(0, _lindex),
                              {
                                ...(list[_lindex]),
                                name: e.target.value
                              },
                              ...list.slice(_lindex + 1)
                            ]
                            setList(updateList)
                          }}
                          onBlur={() => setEditable(false)}/>
                      ) :  (<div className='file-name'>{ _litem.name }</div>)
                    }
                    <div className='more' style={{ borderLeft: _lindex === lidx ? '1px solid #fff' : '1px solid #e5e7eb'}}>
                      <Popover
                        placement="right"
                        content={
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: 'fit-content' }}>
                            <Button icon={<EditOutlined />} onClick={() => setEditable(true)}>{ t('rename') }</Button>
                            <Button icon={<DeleteOutlined />} onClick={() => onDelete(_lindex)}>{ t('delete') }</Button>
                            <Button icon={<DownloadOutlined />} onClick={() => onDownload(_lindex)}>{ t('download') }</Button>
                          </div>
                        }
                        trigger="click"
                      >
                        <EllipsisOutlined />
                      </Popover>
                    </div>
                  </div>
                ))
              }
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
            <div className='logout'>{ t('exit') }</div>
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