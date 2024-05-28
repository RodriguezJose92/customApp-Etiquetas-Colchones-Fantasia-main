import { ServiceContext, RecorderState, ParamsContext } from '@vtex/api'
import { Service } from '@vtex/api'

import { Clients } from './clients'
import { deleteBook } from './resolvers/delete'
import { total } from './resolvers/total'
import { setProductTagCustom } from './resolvers/setProductTagCustom'
import { getProductTagCustom } from './resolvers/getProductTagCustom'
import { deleteProductTagCustom } from './resolvers/deleteProductTagCustom'
import { updateProductTagCustom } from './resolvers/updateProductTagCustom'



const MEDIUM_TIMEOUT_MS = 2 * 1000

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines resolvers and clients' options
export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: MEDIUM_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers: {
      Mutation: {
        delete: deleteBook,
        setProductTagCustom,
        deleteProductTagCustom,
        updateProductTagCustom
      },
      Query: {
        total,
        getProductTagCustom
      },
    },
  }
})
