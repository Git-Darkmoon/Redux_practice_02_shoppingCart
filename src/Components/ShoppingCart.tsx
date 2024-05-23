import { useAppSelector } from "../hooks"
import CartProduct from "./CartProduct"
import SectionCard from "./SectionCard"

function ShoppingCart() {
  const { cartItems: cartProducts } = useAppSelector((state) => state.cart)

  return (
    <SectionCard header="Cart" type="cart" cartItems={0}>
      {cartProducts.map((cartItem) => (
        <CartProduct key={cartItem.id} {...cartItem} />
      ))}
    </SectionCard>
  )
}
export default ShoppingCart
