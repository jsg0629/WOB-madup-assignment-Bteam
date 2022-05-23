import styles from './dashboard.module.scss'
import CurrentStatusOfMedium from './MediaCurrentStatus/CurrentStatusOfMedium'

const Dashboard = (): JSX.Element => {
  return (
    <div>
      <div>Dashboard</div>
      <CurrentStatusOfMedium />
    </div>
  )
}
export default Dashboard
