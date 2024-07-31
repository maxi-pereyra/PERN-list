
import ShoppingItems from "./shoppingItems";
import { useShopping } from "../hooks/useShopping";
import { MdPlaylistRemove } from "react-icons/md";
import { useEffect, useState } from "react"

function Shopping() {
    const {cart, addToCart,discountToCart,clearToCart,offPorcentaje} = useShopping();
    const [visibleModal,setVisibleModal] = useState({visible:false,id:''});
    const [offProductporcentaje,setOffProductPorcentaje] = useState(' ')
    const [totales,setTotales] = useState(0)

    
    useEffect(()=>{
      const calculaToal = () => {
        var calculo = 0
        for(let i=0; i<cart.length ; i++){
      
          if(!(typeof cart[i].off == 'undefined')){
            const presioConDescuento = cart[i].price ? Number(cart[i].price_off) : 0;
            console.log(presioConDescuento) 
          }else{
            const presioSinDescuento = cart[i].price ? Number(cart[i].price) : 0;
            console.log(presioSinDescuento)
            calculo=calculo + presioSinDescuento
          }
        }
        setTotales(calculo)
      }
     cart.length>0 && calculaToal()
    },[cart])

    console.log(cart)
    return (
    <div>
        <h3 className="text-center">carrito</h3>
        <h4 className="ml-4">Total: {totales}</h4>
        {cart.map((product) => <ShoppingItems key={product.id} product={product}
         addToCart={()=>addToCart(product)} discountToCart={()=>discountToCart(product)}
          offPorcentaje={offPorcentaje}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          offProductporcentaje={offProductporcentaje}
          setOffProductPorcentaje={setOffProductPorcentaje} />)}
         
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