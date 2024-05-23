import { useEffect, useState } from "react"
import { Product } from "../types"
import SectionCard from "./SectionCard"
import ProductCard from "./ProductCard"

const API_URL = "https://fakestoreapi.com/products"

function AllProducts() {
  const [products, setProducts] = useState<Product[]>([])

  const fetchData = async () => {
    const response = await fetch(API_URL)
    const data = await response.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SectionCard header="All Products" type="products">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </SectionCard>
  )
}
export default AllProducts
