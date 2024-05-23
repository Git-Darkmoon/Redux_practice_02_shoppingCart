export type cartState = {
  cartItems: Product[]
  numItemsInCart: number
  shipping: number
  cartTotal: number
  orderTotal: number
}

export type Product = {
  readonly id: number
  readonly title: string
  readonly price: number
  readonly description?: string
  readonly category?: string
  readonly image: string
  readonly rating?: Rating
  quantity?: number
}

export type Rating = {
  readonly rate: number
  readonly count: number
}
