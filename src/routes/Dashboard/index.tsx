import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import store from 'store'

import {
  byChannelDataResultState,
  byChannelFetchState,
  dailyDataResultState,
  dailyFetchState,
  prevDailyDataResultState,
} from 'states/dashboard'

import CalendarModal from './CalendarModal/CalendarModal'
import AdTop from './AdTop'
import Chart from './Chart'
import styles from './dashboard.module.scss'
import CurrentStatusOfMedium from './CurrentStatusOfMedium'
import { getDailyData, getByChannelData, getPrevDailyData } from 'services/ads'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')
  const prevStartDate = store.get('prevStartDate')
  const prevEndDate = store.get('prevEndDate')

  const [dailyFetch, setDailyFetch] = useRecoilState(dailyFetchState)
  const [byChannelFetch, setByChannelFetch] = useRecoilState(byChannelFetchState)

  const [, setDailyData] = useRecoilState(dailyDataResultState)
  const [, setPrevDailyData] = useRecoilState(prevDailyDataResultState)

  const [byChannelData, setByChannelData] = useRecoilState(byChannelDataResultState)

  const { data: dailyDataResult } = useQuery(
    ['getDailyData', currentStartDate, currentEndDate],
    () => {
      getDailyData(currentStartDate, currentEndDate, setDailyData)
    },
    {
      useErrorBoundary: true,
      enabled: !!dailyFetch,
      staleTime: 6 * 50 * 1000,
      onSuccess: () => {
        setDailyFetch(false)
      },
    }
  )

  const { data: prevDailyDataResult } = useQuery(
    ['getPrveDailyData', prevStartDate, prevEndDate],
    () => {
      getPrevDailyData(prevStartDate, prevEndDate, setPrevDailyData)
    },
    {
      useErrorBoundary: true,
      enabled: !!dailyFetch,
      staleTime: 6 * 50 * 1000,
      onSuccess: () => {
        setDailyFetch(false)
      },
    }
  )

  const { data: byChannelDataResult } = useQuery(
    ['getByChannelData', currentStartDate, currentEndDate],
    () => {
      getByChannelData(currentStartDate, currentEndDate, setByChannelData)
    },
    {
      useErrorBoundary: true,
      enabled: !!byChannelFetch,
      staleTime: 6 * 50 * 1000,
      onSuccess: () => {
        setByChannelFetch(false)
      },
    }
  )

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
              <CalendarModal setIsModalOpen={setIsModalOpen} />
            </div>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.adSectionWrapper}>
          <h2 className={styles.adSectionTitle}>통합 광고 현황</h2>
          <div className={styles.boardWrapper}>
            <AdTop />
            <Chart />
          </div>
        </div>
        <div className={styles.currentStatusOfMediumSectionWrapper}>
          <h2 className={styles.currentStatusOfMediumTitle}>매체 현황</h2>
          <CurrentStatusOfMedium />
        </div>
      </main>
    </div>
  )
}
export default Dashboard
