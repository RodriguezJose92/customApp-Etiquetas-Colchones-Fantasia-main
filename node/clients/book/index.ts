import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class BookClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://example.com', context, options)
  }

  public delete = () => true

  public total = () => 1
}
