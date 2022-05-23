import dayjs from 'dayjs'
import { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'

const CalendarModal = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const transformedStartDate = dayjs(startDate).format('YYYY-MM-DD')
  const transformedEndDate = dayjs(endDate).format('YYYY-MM-DD')

  console.log(transformedStartDate)
  console.log(transformedEndDate)

  const onChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    // <DatePicker
    //   inline
    //   selected={startDate}
    //   monthsShown={2}
    //   selectsRange
    //   startDate={startDate}
    //   endDate={endDate}
    //   onChange={onChange}
    // />
    <div style={{ width: '300px', display: 'flex' }}>
      <DatePicker
        renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
          <div>
            <button
              type='button'
              aria-label='Previous Month'
              className='react-datepicker__navigation react-datepicker__navigation--previous'
              style={customHeaderCount === 1 ? { visibility: 'hidden' } : undefined}
              onClick={decreaseMonth}
            >
              <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'>
                {'<'}
              </span>
            </button>
            <span className='react-datepicker__current-month'>
              {monthDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              type='button'
              aria-label='Next Month'
              className='react-datepicker__navigation react-datepicker__navigation--next'
              style={customHeaderCount === 0 ? { visibility: 'hidden' } : undefined}
              onClick={increaseMonth}
            >
              <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--next'>{'>'}</span>
            </button>
          </div>
        )}
        selected={startDate}
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        monthsShown={2}
      />
      <button style={{ marginTop: '30px', width: '100px', border: '1px solid black' }} type='button'>
        fetch Data
      </button>
    </div>
  )
}

export default CalendarModal
