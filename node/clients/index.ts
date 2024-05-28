import { IOClients } from '@vtex/api'
import { BookClient } from './book'
import { MarkdownClient } from './markdown'
import { MasterDataClient } from './md'

export class Clients extends IOClients {
    public get book() {
        return this.getOrSet('book', BookClient)
      }
    
      public get markdown() {
        return this.getOrSet('markdown', MarkdownClient)
      }
      public get md() {
        return this.getOrSet('md', MasterDataClient)
      }
}
