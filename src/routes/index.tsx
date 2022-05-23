import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'

import Dashboard from './Dashboard'
import AdvertiseManage from './AdvertiseManage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='advertise' element={<AdvertiseManage />} />
      </Routes>
    </div>
  )
}

export default App
