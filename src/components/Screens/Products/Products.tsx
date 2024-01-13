import React from 'react'
import { Link } from "react-router-dom"
import { products } from "../../../types/products"
import "./Products.css"

import ProductCard from "../../ProductCard/ProductCard"

const Products: React.FC = () => {
  return (
    <section className="products">
        <h2>Products</h2>
        <div className="products-items">
            {products.map((product) => {
                return(
                    <ProductCard key={product.id} image={product.image} name={product.name} price={product.price} id={product.id}/>
                )
            })}
        </div>
    </section>
  )
}

export default Products