import AdTop from './AdTop'
import styles from './dashboard.module.scss'
import CurrentStatusOfMedium from './CurrentStatusOfMedium'

const Dashboard = (): JSX.Element => {
  return (
    <div className={styles.adSectionWrapper}>
      <h2 className={styles.adSectionTitle}>통합 광고 현황</h2>
      <div className={styles.boardWrapper}>
        <AdTop />
      </div>
      <h2 className={styles.currentStatusOfMediumTitle}>매체 현황</h2>
      <CurrentStatusOfMedium />
    </div>
  )
}
export default Dashboard
