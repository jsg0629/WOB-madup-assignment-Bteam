/* eslint-disable react/style-prop-object */
import styles from './CurrentStatusOfMedium.module.scss'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryVoronoiContainer } from 'victory'
import { useRecoilState } from 'recoil'
import { byChannelDataResultState } from 'states/dashboard'
import { roundToTwo, fomatting } from 'utils/num'

const CurrentStatusOfMedium = () => {
  const [byChannelData] = useRecoilState(byChannelDataResultState)
  console.log(byChannelData)

  const reduceData = (_channel: string) => {
    const fiteredDate = byChannelData.filter((el: { channel: string }) => el.channel === _channel)
    return fiteredDate.reduce((acc, cur, i) => {
      if (i === fiteredDate.length - 1) {
        return {
          sales: Math.round(cur.sales + acc.sales),
          channel: cur.channel,
          imp: cur.imp + acc.imp,
          click: cur.click + acc.click,
          cost: cur.cost + acc.cost,
          convValue: cur.convValue + acc.convValue,
          ctr: roundToTwo((cur.ctr + acc.ctr) / fiteredDate.length),
          cpc: Math.round((cur.cpc + acc.cpc) / fiteredDate.length),
          roas: Math.round((cur.roas + acc.roas) / fiteredDate.length),
        }
      }
      return {
        sales: Math.round(cur.sales + acc.sales),
        channel: cur.channel,
        imp: cur.imp + acc.imp,
        click: cur.click + acc.click,
        cost: cur.cost + acc.cost,
        convValue: cur.convValue + acc.convValue,
        ctr: cur.ctr + acc.ctr,
        cpc: cur.cpc + acc.cpc,
        roas: Math.round(cur.roas + acc.roas),
      }
    })
  }
  const reducedAllDataObj: any = {
    google: reduceData('google'),
    naver: reduceData('naver'),
    facebook: reduceData('facebook'),
    kakao: reduceData('kakao'),
  }
  const reducedAllDataArr = [reduceData('google'), reduceData('facebook'), reduceData('naver'), reduceData('kakao')]

  const createVictoryBarData = (key: string) => {
    return [
      {
        xAxis: 'sales',
        yAxis: Math.round(
          (reducedAllDataObj[key].sales /
            (reducedAllDataObj.google.sales +
              reducedAllDataObj.naver.sales +
              reducedAllDataObj.facebook.sales +
              reducedAllDataObj.kakao.sales)) *
            100
        ),
      },
      {
        xAxis: 'cost',
        yAxis: Math.round(
          (reducedAllDataObj[key].cost /
            (reducedAllDataObj.google.cost +
              reducedAllDataObj.naver.cost +
              reducedAllDataObj.facebook.cost +
              reducedAllDataObj.kakao.cost)) *
            100
        ),
      },
      {
        xAxis: 'imp',
        yAxis: Math.round(
          (reducedAllDataObj[key].imp /
            (reducedAllDataObj.google.imp +
              reducedAllDataObj.naver.imp +
              reducedAllDataObj.facebook.imp +
              reducedAllDataObj.kakao.imp)) *
            100
        ),
      },
      {
        xAxis: 'click',
        yAxis: Math.round(
          (reducedAllDataObj[key].click /
            (reducedAllDataObj.google.click +
              reducedAllDataObj.naver.click +
              reducedAllDataObj.facebook.click +
              reducedAllDataObj.kakao.click)) *
            100
        ),
      },
      {
        xAxis: 'convValue',
        yAxis: Math.round(
          (reducedAllDataObj[key].convValue /
            (reducedAllDataObj.google.convValue +
              reducedAllDataObj.naver.convValue +
              reducedAllDataObj.facebook.convValue +
              reducedAllDataObj.kakao.convValue)) *
            100
        ),
      },
    ]
  }

  // console.log(
  //   reducedAllDataArr,
  //   createVictoryBarData('google'),
  //   createVictoryBarData('facebook'),
  //   createVictoryBarData('naver'),
  //   createVictoryBarData('kakao')
  // )

  return (
    <div className={styles.currentStatusOfMediumContainer}>
      <div className={styles.rechartsContainer}>
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
        </div>
        <div className={styles.legendWrapper}>recharts legend</div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableContent}>
          <table>
            <thead className='ant-table-thead'>
              <tr>
                <th className='ant-table-cell'>
                  <span className='ant-table-cell-content' />
                </th>
                <th className='ant-table-cell'>광고비</th>
                <th className='ant-table-cell'>매출</th>
                <th className='ant-table-cell'>광고수익률(ROAS)</th>
                <th className='ant-table-cell'>노출수</th>
                <th className='ant-table-cell'>클릭수</th>
                <th className='ant-table-cell'>클릭률(CTR)</th>
                <th className='ant-table-cell'>클릭당비용(CPC)</th>
              </tr>
            </thead>
            <tbody className='ant-table-tbody'>
              {reducedAllDataArr.map((item) => {
                return (
                  <tr
                    key={`key ${item.channel}`}
                    data-row-key={`${item.channel}`}
                    className='ant-table-row ant-table-row-level-0'
                  >
                    <td title={`${item.channel}`}>
                      <span className='ant-table-cell-content'>{item.channel.toUpperCase()}</span>
                    </td>
                    <td className='ant-table-cell'>{fomatting(item.cost)}원</td>
                    <td className='ant-table-cell'>{fomatting(item.sales)}원</td>
                    <td className='ant-table-cell'>{item.roas}%</td>
                    <td className='ant-table-cell'>{fomatting(item.imp)}</td>
                    <td className='ant-table-cell'>{fomatting(item.click)}</td>
                    <td className='ant-table-cell'>{item.ctr}%</td>
                    <td className='ant-table-cell'>{fomatting(item.cpc)}원</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className='ant-table-summary'>
              <tr>
                <td className='ant-table-cell'>총계</td>
                <td className='ant-table-cell'>
                  {fomatting(
                    reducedAllDataObj.google.cost +
                      reducedAllDataObj.naver.cost +
                      reducedAllDataObj.facebook.cost +
                      reducedAllDataObj.kakao.cost
                  )}
                  원
                </td>
                <td className='ant-table-cell'>
                  {fomatting(
                    reducedAllDataObj.google.sales +
                      reducedAllDataObj.naver.sales +
                      reducedAllDataObj.facebook.sales +
                      reducedAllDataObj.kakao.sales
                  )}
                  원
                </td>
                <td className='ant-table-cell'>
                  {Math.round(
                    (reducedAllDataObj.google.roas +
                      reducedAllDataObj.naver.roas +
                      reducedAllDataObj.facebook.roas +
                      reducedAllDataObj.kakao.roas) /
                      4
                  )}
                  %
                </td>
                <td className='ant-table-cell'>
                  {fomatting(
                    reducedAllDataObj.google.imp +
                      reducedAllDataObj.naver.imp +
                      reducedAllDataObj.facebook.imp +
                      reducedAllDataObj.kakao.imp
                  )}
                </td>
                <td className='ant-table-cell'>
                  {fomatting(
                    reducedAllDataObj.google.click +
                      reducedAllDataObj.naver.click +
                      reducedAllDataObj.facebook.click +
                      reducedAllDataObj.kakao.click
                  )}
                </td>
                <td className='ant-table-cell'>
                  {roundToTwo(
                    (reducedAllDataObj.google.ctr +
                      reducedAllDataObj.naver.ctr +
                      reducedAllDataObj.facebook.ctr +
                      reducedAllDataObj.kakao.ctr) /
                      4
                  )}
                  %
                </td>
                <td className='ant-table-cell'>
                  {fomatting(
                    Math.round(
                      (reducedAllDataObj.google.cpc +
                        reducedAllDataObj.naver.cpc +
                        reducedAllDataObj.facebook.cpc +
                        reducedAllDataObj.kakao.cpc) /
                        4
                    )
                  )}
                  원
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CurrentStatusOfMedium
