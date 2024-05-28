export const updateProductTagCustom = async (
    _: any,
    { id,idTag, urlImg, isImgUse, textTag, colorTag, sizeFontTag, dateInit, dateEnd, colorTextTag, endInDate, active }: 
    { id:string, idTag:string, urlImg:string, isImgUse:boolean, textTag:string, colorTag:string, sizeFontTag:string,
         dateInit:string, dateEnd:string, colorTextTag:string, endInDate:boolean, active:boolean },
    { clients: { md } }: Context
  ) => {
    const cart = await md.updateProductTagCustom(id, idTag, urlImg, isImgUse, textTag, colorTag, sizeFontTag, dateInit, dateEnd, colorTextTag, endInDate, active)
    return cart
  }
  