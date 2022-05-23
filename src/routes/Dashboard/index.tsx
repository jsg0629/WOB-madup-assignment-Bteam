import styles from './dashboard.module.scss'
import CurrentStatusOfMedium from './MediaCurrentStatus/CurrentStatusOfMedium'

const Dashboard = (): JSX.Element => {
  return (
    <div className={styles.dashboardContainer}>
      <div>Dashboard</div>
      <CurrentStatusOfMedium />
    </div>
  )
}
export default Dashboard
