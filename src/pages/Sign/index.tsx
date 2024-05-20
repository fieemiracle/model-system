import { Button, Col, Form, GetProp, Input, Row, Select, Upload, UploadProps, message, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import './style.less'
import { useConfig } from '../../context/hooks/useConfig'
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormI, ListI } from '../types'
import { getFormValue } from '../../utils'
import gotoSign from '../../service/sign'
import { useNavigate } from 'react-router-dom'

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

export default function SignPage() {
  const { form, setForm } = useConfig()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const { t } = useTranslation()
  const [status, setStatus] = useState(t('userRole'))
  const [signForm, setSignForm] = useState(form)
  const navigate = useNavigate()

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

  const onSign = async () => {
    const token_storage = sessionStorage.getItem('token')
    const params = {
      username: getFormValue(form, 'username'),
      password: getFormValue(form, 'password'),
      repassword: getFormValue(form, 'repassword'),
      phone: getFormValue(form, 'phone'),
      email: getFormValue(form, 'email'),
      avatar: getFormValue(form, 'avatar'),
      status: getFormValue(form, 'status'),
      token: token_storage
    }

    const res = await gotoSign(params)
    const { code, msg, data } = res
    if (code) {
      message.error(msg)
    } else {
      const { expiretime, token, username, avatar, role } = data
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('expiretime', expiretime)
      sessionStorage.setItem('role', role)
      message.success(msg)
      onReset()
    }
  }

  const onReset = () => {
    const initForm = form.map((_form) => {
      return {
        ..._form,
        value: ''
      }
    })

    setSignForm(initForm)
  }

  return (
    <>
      <div className='sign-wrap'>
        <div className='form-wrap'>
          <Form
            // key='normal_sign'
            className='sign-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            {...formItemLayout}
          >
            {
              signForm.map((formitem, fidx) => (
                formitem.show ? (
                  <Form.Item
                    key={`sign-form-${formitem.label}`}
                    label={formitem.label}
                    name={formitem.label}
                    rules={formitem.rules}
                    tooltip={formitem.tooltip}
                    hasFeedback={formitem.hasFeedback}
                    dependencies={formitem.dependencies}
                  >
                    {
                      formitem.type === 'status' && <Radio.Group
                        options={[t('userRole')]}
                        onChange={({ target: { value } }: RadioChangeEvent) => setStatus(value)}
                        value={formitem.value | t('userRole')}
                        optionType="button"
                      />
                    }
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
                      }} />
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
                      formitem.type === 'upload' && <Upload action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188' listType='picture-circle' name={formitem.label} showUploadList={false} onChange={handleChange} beforeUpload={beforeUpload}>
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
              <Col
                span={8}
                onClick={onSign}
              >
                <Button type='primary' htmlType='submit' className='sign-form-button' block>
                  {t('register')}
                </Button>
              </Col>
              <Col
                span={8}
                onClick={onReset}
              >
                <Button type='primary' htmlType='submit' className='sign-form-button' block>
                  {t('reset')}
                </Button>
              </Col>
              <Col
                span={8}
                onClick={onReset}
              >
                <Button type='primary' htmlType='submit' className='sign-form-button' block onClick={() => {
                  sessionStorage.setItem('token', 'guider')
                  sessionStorage.setItem('expiretime', Math.floor(Date.now() / 1000) + 18000)
                  sessionStorage.setItem('role', 0)
                  navigate('/chat')
                }}>
                  {t('guidergoin')}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </div>
      </div>
    </>
  )
}