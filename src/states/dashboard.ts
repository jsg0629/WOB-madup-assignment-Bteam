import { atom } from 'recoil'
import { IByChannelData, IDailyData } from 'types/dashboard'

export const dailyDataResultState = atom<IDailyData[]>({
  key: '#dailyDataResultState',
  default: [],
})

export const byChannelDataResultState = atom<IByChannelData[]>({
  key: '#byChannelDataResultState',
  default: [],
})
