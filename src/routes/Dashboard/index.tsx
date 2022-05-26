import { useQuery } from 'react-query'
import { useState, useMount } from 'hooks'
import { useRecoilState, useSetRecoilState } from 'hooks/state'
import store from 'store'

import { byChannelDataResultState, byChannelFetchState } from 'states/dashboard'
import { getByChannelData } from 'services/ads'

import AdStatus from './AdStatus'
import CalendarModal from './CalendarModal/CalendarModal'
import CurrentStatusOfMediumContents from './CurrentStatusOfMediumContents'
import { DownArrow } from 'assets/svgs'
import styles from './dashboard.module.scss'
import Loading from 'routes/_shared/Loading'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')

  const [byChannelFetch, setByChannelFetch] = useRecoilState(byChannelFetchState)
  const setByChannelData = useSetRecoilState(byChannelDataResultState)
  const [byChannelData] = useRecoilState(byChannelDataResultState)

  const [loading, setLoading] = useState(false)

  useMount(() => {
    setLoading(true)
    setTimeout(() => {
      getByChannelData(currentStartDate, currentEndDate, setByChannelData)
      setLoading(false)
    }, 600)
  })

  const { isLoading } = useQuery(
    ['getByChannelData', currentStartDate, currentEndDate],
    () => {
      setLoading(true)
      setTimeout(() => {
        getByChannelData(currentStartDate, currentEndDate, setByChannelData)
        setLoading(false)
      }, 600)
    },
    {
      useErrorBoundary: true,
      enabled: !!byChannelFetch,
      staleTime: 6 * 50 * 1000,
      retryDelay: 7000,
      onSuccess: () => {
        setByChannelFetch(false)
      },
    }
  )

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <header className={styles.header}>
        <h2>대시보드</h2>
        <div className={styles.calendarContainer}>
          <button className={styles.calendarOpenButton} type='button' onClick={handleOpenModal}>
            {`${currentStartDate} ~ ${currentEndDate}`}
            <DownArrow />
          </button>
          {isModalOpen && (
            <div className={styles.calendar}>
              <CalendarModal setIsModalOpen={setIsModalOpen} />
            </div>
          )}
        </div>
      </header>
      <main className={styles.main}>
        {isLoading && <Loading />}
        <AdStatus />
        <section className={styles.currentStatusOfMediumSection}>
          <h3 className={styles.currentStatusOfMediumTitle}>매체 현황</h3>
          <div className={styles.currentStatusOfMediumContentsContainer}>
            {loading ? <Loading /> : byChannelData.length > 0 && <CurrentStatusOfMediumContents />}
          </div>
        </section>
      </main>
    </>
  )
}
export default Dashboard
