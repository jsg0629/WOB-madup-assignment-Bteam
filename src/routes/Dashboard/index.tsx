import { addDays } from 'date-fns/esm'
import dayjs from 'dayjs'
import { useState } from 'react'
import CalendarModal from './CalendarModal/CalendarModal'
import styles from './dashboard.module.scss'

const defaultStartDate = dayjs(new Date()).format('YYYY-MM-DD')
const defaultEndDate = dayjs(addDays(new Date(), 1)).format('YYYY-MM-DD')

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStartDate, setCurrentStartDate] = useState(defaultStartDate)
  const [currentEndDate, setCurrentEndDate] = useState(defaultEndDate)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div>
      <header className={styles.header}>
        <h2>대시보드</h2>
        <div className={styles.calendarContainer}>
          <button className={styles.calendarOpenButton} type='button' onClick={handleOpenModal}>
            {`${currentStartDate} - ${currentEndDate}`}
          </button>
          {isModalOpen && (
            <div className={styles.calendar}>
              <CalendarModal
                setIsModalOpen={setIsModalOpen}
                setCurrentStartDate={setCurrentStartDate}
                setCurrentEndDate={setCurrentEndDate}
              />
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default Dashboard
