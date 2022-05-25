import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import store from 'store'

import { byChannelDataResultState, byChannelFetchState, dailyDataResultState, dailyFetchState } from 'states/dashboard'
import { getDailyData, getByChannelData } from 'services/ads'

import CalendarModal from './CalendarModal/CalendarModal'
import AdTop from './AdTop'
import Chart from './Chart'
import styles from './dashboard.module.scss'
import CurrentStatusOfMedium from './CurrentStatusOfMedium'
import { useMount } from 'react-use'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')
  const [dailyFetch, setDailyFetch] = useRecoilState(dailyFetchState)
  const [byChannelFetch, setByChannelFetch] = useRecoilState(byChannelFetchState)
  const [, setDailyData] = useRecoilState(dailyDataResultState)
  const [, setByChannelData] = useRecoilState(byChannelDataResultState)

  useMount(() => {
    getDailyData(currentStartDate, currentEndDate).then((res) => {
      setDailyData(res.data)
    })
  })

  const { isLoading: isDailyLoading } = useQuery(
    ['getDailyData', currentStartDate, currentEndDate],
    () => {
      getDailyData(currentStartDate, currentEndDate).then((res) => {
        setDailyData(res.data)
      })
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

  const { isLoading: isChannelLoading } = useQuery(
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

  if (isDailyLoading || isChannelLoading) {
    return <div>Loading...</div>
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
