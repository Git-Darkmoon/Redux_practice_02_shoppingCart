import { clearCart } from "../features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { formatPrice } from "../utils/formatPrice"

type AllProducts = {
  type: "products"
  header: string
  children: React.ReactNode
}

type ShoppingCart = {
  type: "cart"
  header: string
  cartItems: number
  children: React.ReactNode
}

type SectionCard = AllProducts | ShoppingCart

function SectionCard({ type, header, children }: SectionCard) {
  const { cartTotal, shipping, numItemsInCart } = useAppSelector(
    (state) => state.cart
  )
  const dispatch = useAppDispatch()

  if (type === "cart") {
    if (cartTotal === 0) {
      return (
        <section className="sectionCard">
          <header className="sectionCard__header">{header}</header>
          <p className="sectionCard__cart">Your cart is empty.</p>
        </section>
      )
    }

    return (
      <section className="sectionCard">
        <header className="sectionCard__header">
          {header} ({numItemsInCart})
        </header>
        <ul className="sectionCard__cart">{children}</ul>
        <div className="sectionCard__cart__total">
          <p>Shipping:</p>
          <p>{formatPrice(shipping)}</p>
        </div>
        <div className="sectionCard__cart__total">
          <p>Total:</p>
          <p>{formatPrice(cartTotal)}</p>
        </div>

        <button type="button" className="sectionCard__cart__btn">
          Checkout
        </button>
        <button
          type="button"
          className="sectionCard__cart__clearBtn"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </section>
    )
  }

  return (
    <section className="sectionCard">
      <header className="sectionCard__header">{header}</header>
      <main className="sectionCard__main">{children}</main>
    </section>
  )
}
export default SectionCard
