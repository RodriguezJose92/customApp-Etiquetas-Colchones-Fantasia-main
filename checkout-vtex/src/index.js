import {
  initialLoad as initialLoadCart,
  orderFormUpdate as orderFormUpdateCart,
  stepStart as stepStartCart,
} from './modules/cart'
import {
  initialLoad as initialLoadEmail,
  orderFormUpdate as orderFormUpdateEmail,
  stepStart as stepStartEmail,
} from './modules/email'
import {
  initialLoad as initialLoadResume,
  orderFormUpdate as orderFormUpdateResume,
  stepStart as stepStartResume,
} from './modules/minicart-resume'
import {
  initialLoad as initialLoadPayments,
  orderFormUpdate as orderFormUpdatePayments,
  stepStart as stepStartPayments,
} from './modules/payment'
import {
  initialLoad as initialLoadProfile,
  orderFormUpdate as orderFormUpdateProfile,
  stepStart as stepStartProfile,
} from './modules/profile'
import {
  initialLoad as initialLoadShipping,
  orderFormUpdate as orderFormUpdateShipping,
  stepStart as stepStartShipping,
} from './modules/shipping'

$(document).ready(() => {
  initialLoadCart()
  initialLoadEmail()
  initialLoadProfile()
  initialLoadShipping()
  initialLoadPayments()
  initialLoadResume()
})

$(window).on('orderFormUpdated.vtex', (_, orderForm) => {
  orderFormUpdateCart(orderForm)
  orderFormUpdateEmail(orderForm)
  orderFormUpdateProfile(orderForm)
  orderFormUpdateShipping(orderForm)
  orderFormUpdatePayments(orderForm)
  orderFormUpdateResume(orderForm)
})

$(window).on('load hashchange', () => {
  if (window.location.hash === '#/cart') {
    stepStartCart()
  }

  if (window.location.hash === '#/email') {
    stepStartEmail()
  }

  if (window.location.hash === '#/profile') {
    stepStartProfile()
    stepStartResume()
  }

  if (window.location.hash === '#/shipping') {
    stepStartShipping()
  }

  if (window.location.hash === '#/payment') {
    stepStartPayments()
  }
})
