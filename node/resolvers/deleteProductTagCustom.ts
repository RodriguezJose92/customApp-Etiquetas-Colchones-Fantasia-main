export const deleteProductTagCustom = async (
    _: any,
    { id }: 
    { id:string },
    { clients: { md } }: Context
  ) => {
    const cart = await md.deleteProductTagCustom(id)
    return cart
  }
  