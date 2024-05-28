const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
});
const setCustomerData = (totalBsf, dollarValue) =>{
  vtexjs.checkout.getOrderForm()
  .done(function (orderForm) {
      const order = orderForm?.orderFormId;
      const email = orderForm?.clientProfileData?.email;
      const settings = {
          url: "/api/checkout/pub/orderForm/" + order + "/customData/customerData",
          type: "PUT",
          timeout: 0,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          data: JSON.stringify({ email,  dollarValue, bsf: totalBsf, tasaCambio: dollarValue }),
      };
      $.ajax(settings)
          .done(function (e) {
              return true;
          });
  })
  return true;
}
const PriceToChange = async(orderForm) => {

    const contentTotalizerItemInit = $(`#PriceToChange`)
    const currentTotalBsf = orderForm?.customData?.customApps?.find(customApp =>customApp.id === "customerdata")?.fields?.bsf;
    const currentDollarValue = orderForm?.customData?.customApps?.find(customApp =>customApp.id === "customerdata")?.fields?.dollarValue;

    if(contentTotalizerItemInit.length === 0){
        const res = await fetch('/v.1/getDataPriceToChange')
        const resText = await res.text()
        const resPrice = JSON.parse(resText)
        const dollarValue = resPrice.priceToChange
        const totalBsf = formatter.format(Math.ceil(((orderForm.value * 0.01) * parseFloat(dollarValue)) * 100)/100);
        const itemToChange = `<div id="PriceToChange" class="PriceToChange_content">
                                <span id="PriceToChangeType" class="PriceToChange_content_type">${
                                  resPrice.currencyAbbreviationStore
                                }</span>
                                <span id="PriceToChangePrice" class="PriceToChange_content_price">${
                                  totalBsf
                                }</span>
                            </div>`

        const contentTotalizer = $(`.accordion-inner > table > tfoot`)

        const contentTotalizerItem = $(`#PriceToChange`)
        if (contentTotalizer.length > 0 && contentTotalizerItem.length === 0 && resPrice.show) {
        contentTotalizer.append(itemToChange)
        
        if(!(currentTotalBsf === totalBsf && currentDollarValue === dollarValue)){
          setCustomerData(totalBsf, dollarValue);
        }
        }
    }else if(contentTotalizerItemInit.length === 1){
      const res = await fetch('/v.1/getDataPriceToChange')
      const resText = await res.text()
      const resPrice = JSON.parse(resText)
      const priceToChangeType = $(`#PriceToChangeType`)
      const priceToChangePrice = $(`#PriceToChangePrice`)
      const dollarValue = resPrice.priceToChange
      const totalBsf = formatter.format(Math.ceil(((orderForm.value * 0.01) * parseFloat(dollarValue)) * 100)/100);
      priceToChangeType.text(resPrice.currencyAbbreviationStore)
      priceToChangePrice.text(totalBsf)
      if(!(currentTotalBsf === totalBsf && currentDollarValue === dollarValue)){
        setCustomerData(totalBsf, dollarValue);
      }
      if(!resPrice.show){
       $(`#PriceToChange`).remove()
      }
    }
  }
  
  const renderPriceToChange = (orderForm) => {
    try {
        PriceToChange(orderForm)
    } catch (error) {
      console.error(error)
    }
  }
  
  export default renderPriceToChange
  