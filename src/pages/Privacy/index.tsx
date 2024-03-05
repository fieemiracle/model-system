import { Button, Col, Form, GetProp, Input, Row, Select, Upload, UploadProps, message } from 'antd'
import './style.less'
import { useConfig } from '../../context/hooks/useConfig'
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}

const { Option } = Select

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export default function PrivacyPage () {
  const { form, setForm } = useConfig()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const { t } = useTranslation()

  const onFinish = (values: unknown) => {
    console.log('Received values of form: ', values)
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false)
        setImageUrl(url)
      });
    }
  }
  return (
    <>
      <div className='privacy-wrap'>
        <div className='form-wrap'>
          <Form
            name='name_privacy'
            className='privacy-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            {...formItemLayout}
          >
            {
              form.map((formitem, fidx) => (
                formitem.show ? (
                  <Form.Item
                    key={`privacy-form-${formitem.label}`}
                    label={formitem.label}
                    name={formitem.label}
                    rules={formitem.rules}
                    tooltip={formitem.tooltip}
                    hasFeedback={formitem.hasFeedback}
                    dependencies={formitem.dependencies}
                  >
                    {
                      formitem.type === 'input' && <Input
                        type={formitem.type}
                        size='large'
                        prefix={formitem.prefix}
                        placeholder={formitem.placeholder}
                        value={formitem.value}
                        allowClear
                        onChange={(value) => {
                          const _formidx = form.findIndex((_f) => _f.label === formitem.label)
                          const _form = {
                            ...form[_formidx],
                            value: value.target.value
                          }
                          setForm([
                            ...form.slice(0, fidx),
                            _form,
                            ...form.slice(fidx + 1)
                          ])
                        }}
                      />
                    }

                    {
                      formitem.type === 'password' && <Input.Password
                        size='large'
                        prefix={formitem.prefix}
                        placeholder={formitem.placeholder}
                        value={formitem.value}
                        allowClear
                        iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(value) => {
                          const _formidx = form.findIndex((_f) => _f.label === formitem.label)
                          const _form = {
                            ...form[_formidx],
                            value: value.target.value
                          }
                          setForm([
                            ...form.slice(0, fidx),
                            _form,
                            ...form.slice(fidx + 1)
                          ])
                        }}
                      />
                    }

                    {
                      formitem.type === 'captcha' && <Row gutter={8}>
                        <Col span={16}>
                          <Form.Item
                            name={formitem.label}
                            noStyle
                            rules={formitem.rules}
                          >
                            <Input
                              size='large'
                              allowClear
                              value={formitem.value}
                              onChange={(value) => {
                                const _formidx = form.findIndex((_f) => _f.label === formitem.label)
                                const _form = {
                                  ...form[_formidx],
                                  value: value.target.value
                                }
                                setForm([
                                  ...form.slice(0, fidx),
                                  _form,
                                  ...form.slice(fidx + 1)
                                ])
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Button size='large'>Get captcha</Button>
                        </Col>
                      </Row>
                    }

                    {
                      formitem.type === 'email' && <Input suffix='.com' value={formitem.value} allowClear onChange={(value) => {
                        const _formidx = form.findIndex((_f) => _f.label === formitem.label)
                        const _form = {
                          ...form[_formidx],
                          value: value.target.value
                        }
                        setForm([
                          ...form.slice(0, fidx),
                          _form,
                          ...form.slice(fidx + 1)
                        ])
                      }}/>
                    }

                    {
                      formitem.type === 'select' && <Select placeholder='select your gender' size='large' value={formitem.value} onChange={(value) => {
                        const _formidx = form.findIndex((_f) => _f.label === formitem.label)
                        const _form = {
                          ...form[_formidx],
                          value
                        }
                        setForm([
                          ...form.slice(0, fidx),
                          _form,
                          ...form.slice(fidx + 1)
                        ])
                      }}>
                        <Option value='male'>Male</Option>
                        <Option value='female'>Female</Option>
                      </Select>
                    }

                    {
                      formitem.type === 'upload' &&  <Upload action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188' listType='picture-circle' name={formitem.label} showUploadList={false} onChange={handleChange} beforeUpload={beforeUpload}>
                        {
                          imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : (
                            <button style={{ border: 0, background: 'none' }} type="button">
                              {loading ? <LoadingOutlined /> : <PlusOutlined />}
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                          )
                        }
                    </Upload>
                    }
                  </Form.Item>
                ) : <div></div>
              ))
            }
          </Form>
          <Form.Item>
              <Row gutter={8}>
                <Col span={12}>
                  <Button type='primary' htmlType='submit' className='sign-form-button' block>
                    { t('modify') }
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type='primary' htmlType='submit' className='sign-form-button' block>
                    { t('reset') }
                  </Button>
                </Col>
              </Row>
            </Form.Item>
        </div>
      </div>
    </>
  )
}