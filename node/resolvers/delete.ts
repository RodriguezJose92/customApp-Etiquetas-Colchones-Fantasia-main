interface Args {
  id: string
}

export const deleteBook = (
  _: any,
  {  }: Args,
  { clients: { book: booksClient } }: Context
) => booksClient.delete()
