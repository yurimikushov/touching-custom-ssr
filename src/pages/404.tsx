import { Link } from 'react-router-dom'
import routes from '../routes'
import Nav from './components/Nav'

const Error404 = () => {
  return (
    <div>
      <Nav />
      <h1>Error 404</h1>
      <Link to={routes.home}>Go to home page</Link>
    </div>
  )
}

export default Error404
