export const setProductTagCustom = async (
    _: any,
    { idTag, urlImg, isImgUse, textTag, colorTag, sizeFontTag, dateInit, dateEnd, colorTextTag, endInDate, active }: 
    { idTag:string, urlImg:string, isImgUse:boolean, textTag:string, colorTag:string, sizeFontTag:string,
         dateInit:string, dateEnd:string, colorTextTag:string, endInDate:boolean, active:boolean },
    { clients: { md } }: Context
  ) => {
    const cart = await md.setProductTagCustom(idTag, urlImg, isImgUse, textTag, colorTag, sizeFontTag, dateInit, dateEnd, colorTextTag, endInDate, active)
    return cart
  }
  