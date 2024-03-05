import { Button, Col, Form, Input, Row } from 'antd'
import './style.less'
import { useConfig } from '../../context/hooks/useConfig'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
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

export default function LoginPage () {
  const { form, setForm } = useConfig()
  const { t } = useTranslation()

  const onFinish = (values: unknown) => {
    console.log('Received values of form: ', values)
  }

  return (
    <>
      <div className='login-wrap'>
        <div className='form-wrap'>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            {...formItemLayout}
          >
            {
              form.filter((_form) => !['gender', 'avatar', 'repassword'].includes(_form.label)).map((formitem, fidx) => (
                formitem.show ? (
                  <Form.Item
                    key={`login-form-${formitem.label}`}
                    label={formitem.label}
                    name={formitem.label}
                    rules={formitem.rules}
                    hasFeedback={formitem.hasFeedback}
                    dependencies={formitem.dependencies}
                    tooltip={formitem.tooltip}
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
                  </Form.Item>
                ) : <div></div>
              ))
            }
          </Form>
          <Form.Item>
              <Row gutter={8}>
                <Col span={8}>
                  <Button type='primary' htmlType='submit' className='login-form-button' block>
                    { t('login') }
                  </Button>
                </Col>
                <Col span={8}>
                  <Button type='primary' htmlType='submit' className='login-form-button' block>
                    { t('reset') }
                  </Button>
                </Col>
                <Col span={8}>
                  <Button type='primary' htmlType='submit' className='login-form-button' block>
                    { t('forget') }
                  </Button>
                </Col>
              </Row>
            </Form.Item>
        </div>
      </div>
    </>
  )
}