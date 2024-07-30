
import { NavLink } from "react-router-dom"
import { useShopping } from "../hooks/useShopping";
import { BsCartCheck } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
// eslint-disable-next-line react/prop-types
function ProductCard({product}) {

  const {cart , addToCart, removeToCart} = useShopping()

    const checkProductInCart = (product) => {
      return cart.some(item => item.id === product.id)
  };

  const isProductInCart = checkProductInCart(product);

  return (
    <div className="bg-gray-700 p-3 flex flex-col  rounded-lg shadow-lg px-10 my-2 
    hover:cursor-pointer sm:flex-row justify-between">
      <div>
          <h3 className="font-bold text-xl">{product.title}  <span className="text-xs"> {product.categories}</span></h3>
          <div className="flex m-1">
              <p className="mr-2">{product.description} </p>
              <span>(precio ultimo: {product.price})</span>
          </div>
      </div>
      <div className="mr-4 px-4">
        <NavLink to={`/products/:${product.id}`}>
          <button
          className="bg-slate-200 hover:bg-slate-300 text-black 
          font-bold py-2 px-4 rounded-lg m-4 "
          >
          edit
          </button>
        </NavLink>

        <button
            className="bg-slate-200 hover:bg-red-300 text-black font-bold
                                 py-2 px-4 rounded-lg my-2 mx-4"
            onClick={() => {
              isProductInCart
                ? removeToCart(product)
                : addToCart(product)
            }}
        >
                  {
                    isProductInCart
                      ? <BsCartCheckFill /> 
                      : <BsCartCheck />
                  }
        </button>
        
      </div>
    </div>
  )
}

export default ProductCard