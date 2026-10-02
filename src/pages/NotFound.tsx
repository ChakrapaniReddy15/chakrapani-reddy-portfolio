import { Link } from '../router'

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <h1>404</h1>
      <p className="lead">This page took a wrong turn.</p>
      <Link className="btn p" to="/">Back home</Link>
    </div>
  )
}
