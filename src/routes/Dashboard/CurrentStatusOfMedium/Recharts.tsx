import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryVoronoiContainer } from 'victory'
import styles from './CurrentStatusOfMedium.module.scss'

const Recharts = ({ createVictoryBarData }: { createVictoryBarData: Function }) => {
  return (
    <div className={styles.rechartsWrapper}>
      <VictoryChart width={1100} height={400} domainPadding={40} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={['sales', 'cost', 'imp', 'click', 'convValue']}
          tickFormat={['매출', '광고비', '노출 수', '클릭 수', '전환 수']}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
        <VictoryStack colorScale={['#56adf7', '#85da47', '#ac8af8', '#f8d849']}>
          <VictoryBar barWidth={30} data={createVictoryBarData('google')} x='xAxis' y='yAxis' />
          <VictoryBar barWidth={30} data={createVictoryBarData('facebook')} x='xAxis' y='yAxis' />
          <VictoryBar barWidth={30} data={createVictoryBarData('naver')} x='xAxis' y='yAxis' />
          <VictoryBar
            cornerRadius={{ top: 6 }}
            barWidth={30}
            data={createVictoryBarData('kakao')}
            x='xAxis'
            y='yAxis'
          />
        </VictoryStack>
      </VictoryChart>
      <div className={styles.rechartsLegendWrapper}>recharts legend</div>
    </div>
  )
}

export default Recharts
