
function ShoppingItems({product,addToCart,discountToCart}) {
   
    return (
    <section>
     <li className="list-none my-2 mx-4 flex flex-row justify-between">
      <div>
        <strong>{product.title} {product.description}</strong> - ${product.price}
      </div>
      <div>
        <button onClick={discountToCart} 
          className="mx-4 w-8 bg-slate-300 hover:bg-red-300 rounded-lg">-</button>
          <span>{product.quantity}</span>
        <button onClick={addToCart}
          className="mx-4  w-8 bg-slate-300 hover:bg-red-300 rounded-lg">+</button>
      </div>

    </li>
    </section>
  )
}

export default ShoppingItems