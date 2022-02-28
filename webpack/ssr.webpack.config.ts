import { getClientConfig } from './utils/client.webpack.config'
import { getServerConfig } from './utils/server.webpack.config'

export default [getClientConfig('ssr', 'static'), getServerConfig()]
