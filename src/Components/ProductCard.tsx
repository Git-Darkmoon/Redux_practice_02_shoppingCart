import { addProduct } from "../features/cart/cartSlice"
import { useAppDispatch } from "../hooks"
import { Product } from "../types"
import { formatPrice } from "../utils/formatPrice"

function ProductCard({ id, image, price, title }: Product) {
  const dispatch = useAppDispatch()

  return (
    <article className="productCard">
      <img className="productCard__img" src={image} alt={title} />

      <div className="productCard__info">
        <h2 className="productCard__info__title">{title}</h2>
        <p className="productCard__info__price">{formatPrice(price)}</p>
        <button
          className="productCard__info__btn"
          onClick={() =>
            dispatch(addProduct({ id, image, price, title, quantity: 1 }))
          }
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}
export default ProductCard
