import { createSlice } from "@reduxjs/toolkit"
import { cartState } from "../../types"

const defaultState: cartState = {
  cartItems: [],
  numItemsInCart: 0,
  shipping: 7.5,
  cartTotal: 0,
  orderTotal: 0,
}

function getCartFromLocalStorage() {
  const cart = localStorage.getItem("cart")
  if (cart) {
    return JSON.parse(cart)
  }
  return defaultState
}

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage() as cartState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload
      const item = state.cartItems.find((i) => i.id === product.id)

      if (item) {
        item.quantity += product.quantity
      } else {
        state.cartItems.push(product)
      }

      state.numItemsInCart += product.quantity
      state.cartTotal += product.price
      cartSlice.caseReducers.calculateTotals(state)
    },
    increaseQuantity: (state, action) => {
      const productInCart = state.cartItems.find(
        (product) => product.id === action.payload.id
      )
      if (productInCart) {
        productInCart.quantity! += 1
      }
      state.cartTotal += productInCart!.price
      state.numItemsInCart += 1
      cartSlice.caseReducers.calculateTotals(state)
    },
    decreaseQuantity: (state, action) => {
      const product = state.cartItems.find((product) => {
        return product.id === action.payload.id
      })

      product!.quantity! -= 1
      state.numItemsInCart -= 1
      state.cartTotal -= product!.price
      cartSlice.caseReducers.calculateTotals(state)
    },
    removeProduct: (state, action) => {
      const { id } = action.payload
      const product = state.cartItems.find((i) => i.id === id)
      state.cartItems = state.cartItems.filter((i) => i.id !== id)

      state.numItemsInCart -= product!.quantity!
      state.cartTotal -= product!.price * product!.quantity!
      cartSlice.caseReducers.calculateTotals(state)
    },
    clearCart: (state) => {
      state.cartItems = []
      state.numItemsInCart = 0
      state.cartTotal = 0
    },
    calculateTotals: (state) => {
      state.numItemsInCart = state.cartItems.reduce(
        (total, product) => total + product.quantity!,
        0
      )
      state.orderTotal = state.cartTotal + state.shipping
      localStorage.setItem("cart", JSON.stringify(state))
    },
  },
})

export const cartReducer = cartSlice.reducer
export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart,
} = cartSlice.actions
