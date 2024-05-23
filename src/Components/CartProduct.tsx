import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import TrashCan from "../icons/TrashCan"
import { Product } from "../types"
import { formatPrice } from "../utils/formatPrice"

function CartProduct({ id, image, price, title }: Product) {
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) =>
    state.cart.cartItems.find((product) => product.id === id)
  )

  return (
    <li className="cartProduct">
      <img className="cartProduct__img" src={image} alt={title} />
      <div className="cartProduct__info">
        <h3 className="cartProduct__info__title">{title}</h3>
        <p className="cartProduct__info__price">{formatPrice(price)}</p>
      </div>
      <div className="cartProduct__counter">
        <button
          type="button"
          className="cartProduct__counter__btn"
          onClick={() => {
            if (product!.quantity! <= 1) {
              dispatch(removeProduct({ id, price }))
            } else {
              dispatch(decreaseQuantity({ id, price }))
            }
          }}
        >
          &minus;
        </button>
        <p className="cartProduct__counter__value">{product?.quantity}</p>
        <button
          type="button"
          className="cartProduct__counter__btn"
          onClick={() => dispatch(increaseQuantity({ id, price }))}
        >
          &#43;
        </button>
      </div>
      <button
        type="button"
        className="cartProduct__btn"
        onClick={() => dispatch(removeProduct({ id, price }))}
      >
        <TrashCan />
      </button>
    </li>
  )
}
export default CartProduct
