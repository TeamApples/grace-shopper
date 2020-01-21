import {useToasts} from 'react-toast-notifications'
import React from 'react'

export const AddedToCartSuccess = () => {
  const {addToast} = useToasts()
  return (
    <button
      id="add-to-cart-btn"
      type="button"
      onClick={() =>
        addToast('Success! the item has been added to your cart', {
          appearance: 'success',
          autoDismiss: true
        })
      }
    >
      Add To Cart
    </button>
  )
}

export const RemoveFromCart = () => {
  const {addToast} = useToasts()
  return (
    <button
      type="button"
      onClick={() =>
        addToast('An item was removed from your cart', {
          appearance: 'warning',
          autoDismiss: true
        })
      }
    >
      Remove
    </button>
  )
}

export const UserSaveSuccess = () => {
  const {addToast} = useToasts()
  return (
    <button
      type="submit"
      onClick={() =>
        addToast('Success! Your information was saved successfully', {
          appearance: 'success',
          autoDismiss: true
        })
      }
    >
      Save Info
    </button>
  )
}
export const OrderSuccess = () => {
  const {addToast} = useToasts()
  return (
    <button
      type="submit"
      id="checkout-btn"
      onClick={() =>
        addToast(
          'Success! Your order was received and is now being processed. Look out for an email confirmation.',
          {
            appearance: 'success',
            autoDismiss: true
          }
        )
      }
    >
      Checkout
    </button>
  )
}
