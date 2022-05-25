import { DecreaseIcon, IncreaseIcon } from 'assets/svgs'
import { useRecoilState } from 'recoil'
import { dailyDataResultState, prevDailyDataResultState } from 'states/dashboard'
import { ICardContentData } from 'types/dashboard'
import { dataProcess, processCardData } from 'utils/adDataProcess'
import styles from './dashboard.module.scss'
import store from 'store'
import { useEffect } from 'react'

const AdTop = () => {
  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')
  const prevStartDate = store.get('prevStartDate')
  const prevEndDate = store.get('prevEndDate')
  const [dailyData] = useRecoilState(dailyDataResultState)
  const [prevDailyData] = useRecoilState(prevDailyDataResultState)
  const sumData = dataProcess(currentStartDate, currentEndDate, dailyData)
  const sumPrevData = dataProcess(prevStartDate, prevEndDate, prevDailyData)

  const adCardContent: ICardContentData[] = processCardData(sumData, sumPrevData)

  if (!store.get('adCardData')) store.set('adCardData', [])

  useEffect(() => {
    store.set('adCardData', adCardContent)
  }, [adCardContent, currentStartDate, currentEndDate, prevEndDate, prevStartDate])

  const adCardData: ICardContentData[] = store.get('adCardData')

  return (
    <ul className={styles.indicatorWrapper}>
      {adCardData.length > 0 &&
        adCardData.map((item) => (
          <li key={item.title} className={styles.indicatorCard}>
            <dl>
              <dt>{item.title}</dt>
              <dd>{item.value}</dd>
            </dl>
            <div className={styles.changeWrapper}>
              {item.increase ? <IncreaseIcon /> : <DecreaseIcon />}
              <span>{item.change}</span>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default AdTop
