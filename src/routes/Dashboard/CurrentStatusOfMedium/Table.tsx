import { IByChannelData } from 'types/dashboard'
import { roundToTwo, fomatting } from 'utils/num'
import styles from './CurrentStatusOfMedium.module.scss'

const Table = ({
  reducedAllChannelDataArr,
  CalculatingSumOfColumns,
}: {
  reducedAllChannelDataArr: IByChannelData[]
  CalculatingSumOfColumns: Function
}) => {
  return (
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
          {reducedAllChannelDataArr.map((item) => {
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
                <td className='ant-table-cell'>{fomatting(Math.round(item.sales))}원</td>
                <td className='ant-table-cell'>{Math.round(item.roas)}%</td>
                <td className='ant-table-cell'>{fomatting(item.imp)}</td>
                <td className='ant-table-cell'>{fomatting(item.click)}</td>
                <td className='ant-table-cell'>{roundToTwo(item.ctr)}%</td>
                <td className='ant-table-cell'>{fomatting(Math.round(item.cpc))}원</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot className='ant-table-summary'>
          <tr>
            <td className='ant-table-cell'>총계</td>
            <td className='ant-table-cell'>{fomatting(CalculatingSumOfColumns('cost'))}원</td>
            <td className='ant-table-cell'>{fomatting(Math.round(CalculatingSumOfColumns('sales')))}원</td>
            <td className='ant-table-cell'>{Math.round(CalculatingSumOfColumns('roas') / 4)}%</td>
            <td className='ant-table-cell'>{fomatting(CalculatingSumOfColumns('imp'))}</td>
            <td className='ant-table-cell'>{fomatting(CalculatingSumOfColumns('click'))}</td>
            <td className='ant-table-cell'>{roundToTwo(CalculatingSumOfColumns('ctr') / 4)}%</td>
            <td className='ant-table-cell'>{fomatting(Math.round(CalculatingSumOfColumns('cpc') / 4))}원</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table
