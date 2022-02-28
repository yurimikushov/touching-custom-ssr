import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Error404 from './pages/404'
import routes from './routes'
import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.about} element={<About />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
  )
}

export default App
