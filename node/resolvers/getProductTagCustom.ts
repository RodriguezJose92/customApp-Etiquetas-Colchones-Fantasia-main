interface Args {
    id: string
  }
export const getProductTagCustom = async (
  _: any,
  {  }: Args,
  { clients: { md } }: Context
) => {
  return md.getProductTagCustom()
}
