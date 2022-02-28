import { Link } from 'react-router-dom'
import routes from '../../routes'

const Nav = () => {
  return (
    <nav style={{ display: 'flex', gap: 10 }}>
      <Link to={routes.home}>Home</Link>
      <Link to={routes.about}>About</Link>
    </nav>
  )
}

export default Nav
