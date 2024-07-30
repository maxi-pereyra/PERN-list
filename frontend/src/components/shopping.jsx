
import ShoppingItems from "./shoppingItems";
import { useShopping } from "../hooks/useShopping";
import { MdPlaylistRemove } from "react-icons/md";

function Shopping() {
    const {cart, addToCart,discountToCart,clearToCart} = useShopping();
   
    console.log(cart)
    return (
    <div>
        <h3 className="text-center">carrito</h3>
        <h4 className="ml-4">Total</h4>
        {cart.map((product) => <ShoppingItems key={product.id} product={product}
         addToCart={()=>addToCart(product)} discountToCart={()=>discountToCart(product)}
         />)}
         
      {
        cart.length && (<button onClick={()=>clearToCart()}
                         className="bg-slate-200 hover:bg-red-300 text-black font-bold
                                        py-2 px-4 rounded-lg my-2 mx-4">
                          <MdPlaylistRemove /> 
                        </button>
                        ) 
      }
    </div>
  )
}

export default Shopping