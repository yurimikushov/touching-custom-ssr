import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'
import Loader from './components/Loader'
import routes from './routes'
import './App.css'

const Home = loadable(
  () => import(/*webpackChunkName: "home-page" */ './pages/Home'),
  {
    fallback: <Loader />,
  }
)

const About = loadable(
  () => import(/*webpackChunkName: "about-page" */ './pages/About'),
  {
    fallback: <Loader />,
  }
)

const Error404 = loadable(
  () => import(/*webpackChunkName: "404-page" */ './pages/404'),
  {
    fallback: <Loader />,
  }
)

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
