import renderPriceToChange from "./PriceToChange"

export const initialLoad = () => {
  // This function is called when document is ready
}

export const orderFormUpdate = (orderForm) => {
  // This function is called every time orderForm is updated
  renderPriceToChange(orderForm)
}

export const stepStart = () => {
  // This function is called when hash in URL match with this module
}
