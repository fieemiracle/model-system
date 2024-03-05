import './style.less'
import type { Dayjs } from 'dayjs'
import type { CalendarProps } from 'antd'
import { Badge, Button, Calendar, Col, Empty, Row, Select } from 'antd'
import dayjs from 'dayjs'
import { Lunar, HolidayUtil, I18n } from 'lunar-typescript'
import { createStyles } from 'antd-style'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import dayLocaleData from 'dayjs/plugin/localeData'
import { useNavigate } from 'react-router-dom'
import { useConfig } from '../../context/hooks/useConfig'
import { TodoI } from '../Todo'

dayjs.extend(dayLocaleData)

const useStyle = createStyles(({ token, css, cx }) => {
  const lunar = css`
    color: ${token.colorTextTertiary};
    font-size: ${token.fontSizeSM}px;
  `;
  return {
    dateCell: css`
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        max-width: 40px;
        max-height: 40px;
        background: transparent;
        transition: background 300ms;
        border-radius: ${token.borderRadiusOuter}px;
        border: 1px solid transparent;
        box-sizing: border-box;
      }
    `,
    text: css`
      position: relative;
      z-index: 1;
    `,
    lunar,
    current: css`
      color: ${token.colorTextLightSolid};
      &:before {
        background: ${token.colorPrimary};
      }
      &:hover:before {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
      .${cx(lunar)} {
        color: ${token.colorTextLightSolid};
        opacity: 0.9;
      }
    `,
    monthCell: css`
      color: ${token.colorTextTertiary};
      border-radius: ${token.borderRadiusOuter}px;
      padding: 5px 0;
      text-align: right;
    `,
    monthCellCurrent: css`
      color: ${token.colorTextTertiary};
      &:hover {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
    `,
  }
})

const CalendarPage = () => {
  const { styles } = useStyle({ test: true })
  const { i18n } = useTranslation()
  const [todos, setTodos] = useState<TodoI[]>([])
  const navigate = useNavigate()
  const { todolist } = useConfig()
  const [selectDate, setSelectdate] = useState<string>('')
  const { t } = useTranslation()

  useEffect(() => {
    const listData = getListData(dayjs())
    setTodos(listData)
  }, [dayjs().date()])

  const getListData = (value: Dayjs) => {
    const fmt_date = `${value.get('year')}/${value.get('month') + 1}/${value.get('date')}`
    const listData = todolist.filter((todo) => todo.date === fmt_date)
    return listData || []
  }
  
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <div className="events">
        {listData.map((item) => (
          <div key={item.content}>
            <Badge color={item.color} text={item.content} />
          </div>
        ))}
      </div>
    )
  }

  const getYearLabel = (year: number) => {
    I18n.setLanguage(i18n.language == 'zh' ? 'chs' : i18n.language)
    const d = Lunar.fromDate(new Date(year + 1, 0))
    const fmt_year = i18n.language == 'zh' ? `${d.getYearInChinese()}年（${d.getYearInGanZhi()}${d.getYearShengXiao()}年）` : `${d.getYear()}（${d.getYearInGanZhi()} ${d.getYearShengXiao()}）`
    return fmt_year
  }

  const getMonthLabel = (month: number, value: Dayjs) => {
    I18n.setLanguage(i18n.language == 'zh' ? 'chs' : i18n.language)
    const d = Lunar.fromDate(new Date(value.year(), month))
    const lunar = d.getMonthInChinese()
    const fmt_mth = i18n.language == 'zh' ? `${month + 1}月（${lunar}月）` : `${month + 1}（${lunar}月）`
    return fmt_mth
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (date, info) => {
    const d = Lunar.fromDate(date.toDate())
    const lunar = d.getDayInChinese()
    const solarTerm = d.getJieQi()
    const h = HolidayUtil.getHoliday(date.get('year'), date.get('month') + 1, date.get('date'))
    const displayHoliday = h?.getTarget() === h?.getDay() ? h?.getName() : undefined

    if (info.type === 'date') {
      return React.cloneElement(info.originNode, {
        ...info.originNode.props,
        className: classNames(styles.dateCell),
        children: (
          <div className={styles.text}>
            {
              info.type === 'date' && (
                <div className={styles.lunar} style={{ textAlign: 'right' }}>{displayHoliday || solarTerm || lunar}</div>
              )
            }
            {
              dateCellRender(date)
            }
          </div>
        ),
      })
    }
  }

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  const onDateChange: CalendarProps<Dayjs>['onSelect'] = (value, selectInfo) => {
    if (selectInfo.source === 'date') {
      setSelectdate(`${value.get('year')}/${value.get('month') + 1}/${value.get('date')}`)
      const listData = getListData(value)
      setTodos(listData)
    }
  }

  return (
    <>
      <div className='calendar-wrap'>
        <div className='calendar'>
          <Calendar
            cellRender={cellRender}
            onPanelChange={onPanelChange}
            onSelect={onDateChange}
            headerRender={({ value, onChange }) => {
              const start = 0
              const end = 12
              const monthOptions = []
              let current = value.clone()
              const localeData = value.localeData()
              const months = []
              for (let i = 0; i < 12; i++) {
                current = current.month(i)
                months.push(localeData.monthsShort(current))
              }
              for (let i = start; i < end; i++) {
                monthOptions.push({
                  label: getMonthLabel(i, value),
                  value: i
                })
              }

              const year = value.year()
              const month = value.month()
              const options = []
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push({
                  label: getYearLabel(i),
                  value: i
                })
              }
              return (
                <Row justify="end" gutter={8} style={{ padding: 8 }}>
                  <Col>
                    <Select
                      popupMatchSelectWidth={false}
                      value={year}
                      options={options}
                      onChange={(newYear) => {
                        const now = value.clone().year(newYear)
                        onChange(now)
                      }}
                    />
                  </Col>
                  <Col>
                    <Select
                      popupMatchSelectWidth={false}
                      value={month}
                      options={monthOptions}
                      onChange={(newMonth) => {
                        const now = value.clone().month(newMonth)
                        onChange(now);
                      }}
                    />
                  </Col>
                </Row>
              )
            }}
          />
        </div>
        <div className='footer-wrap'>
          <div className='todos-wrap'>
            {
              todos.length ? todos.map((todo, tidx) => (
                <div key={tidx} className='todo' style={{ color: todo.done ? '#bfbfbf' : '#1f2937', textDecoration: todo.done ? 'line-through' : 'none' }}>
                  <div className='title'>{`Todo ${tidx}: `}</div>
                  <div className='content'>{todo.content}</div>
                </div> 
              )) : (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={
                    <span>{t('empty')}</span>
                  }
                >
                </Empty>
              )
            }
          </div>
          <Button type="primary" block onClick={() => navigate('/todo', { state: selectDate })}>{t('create')}</Button>
        </div>
      </div>
    </>
  )
}

export default CalendarPage