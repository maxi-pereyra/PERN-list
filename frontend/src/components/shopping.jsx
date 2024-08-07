/* eslint-disable no-unused-vars */

import ShoppingItems from "./shoppingItems";
import { useShopping } from "../hooks/useShopping";
import { MdPlaylistRemove } from "react-icons/md";
import { useEffect, useState } from "react"

function Shopping() {
    const {cart, addToCart,discountToCart,clearToCart,offPorcentaje,updateProduct} = useShopping();
    const [visibleModal,setVisibleModal] = useState({visible:false,id:''});
    const [offProductporcentaje,setOffProductPorcentaje] = useState(' ')
    const [totales,setTotales] = useState(0)
    const [productUp,setProductUp] = useState({
      id: '',
      description:'',
      price:'',
    })
    const [Edit,setEdit] = useState({
      id: '',
      status: false
    })
    
    useEffect(()=>{
      const calculaToal = () => {
        var calculo = 0
        for(let i=0; i<cart.length ; i++){

          if((typeof cart[i].off !== 'undefined') || (cart[i].off  >=0)){
            const presioConDescuento = cart[i].price_off ? Number(cart[i].price_off) : 0;
            calculo=calculo + (presioConDescuento*cart[i].quantity)
          }else{
            const presioSinDescuento = cart[i].price ? Number(cart[i].price) : 0;
            calculo=calculo + (presioSinDescuento*cart[i].quantity)
          }
        }
        setTotales(calculo)
      }
     cart.length>0 && calculaToal()
    },[cart])
 
    const handleUpProduct = () => {
      updateProduct(productUp)
      console.log("Se edito", productUp)
      setEdit({
        id:'',
        status: false
      })
    } 

    const handleChangeUp = (e) => {
      setProductUp({...productUp,id: Edit.id, [e.target.name]: e.target.value})
    }

    if(Edit.status) return ( <aside className="fixed z-50 top-0 left-0 w-full min-h-[100vh] bg-[rgba(0,0,0,0.75)] 
      flex justify-center ">
      <div  className="flex flex-col justify-center items-center ">
            <button onClick={()=>{
              setProductUp({
                id: '',
                description:'',
                price:'',
              });
              setEdit({id:'',status:false})
              }}>X</button>
            <input
                type="text"
                name="price"
                placeholder="price"
                className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
                onChange={handleChangeUp}
                value={productUp.price}
                autoFocus
                />
            <textarea
                name="description"
                rows={4}
                placeholder="Write your description"
                className="border border-gray-400 p-2 rounded-md block my-2 w-full text-gray-800"
                onChange={handleChangeUp}
                value={productUp.description}
          ></textarea>
          <button onClick={handleUpProduct}>Editar</button>
      </div>
    </aside>)

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
          setOffProductPorcentaje={setOffProductPorcentaje} 
          setEdit={setEdit}
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