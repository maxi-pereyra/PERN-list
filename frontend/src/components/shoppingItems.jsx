

// eslint-disable-next-line no-unused-vars
function ShoppingItems({product,addToCart,discountToCart,offPorcentaje,visibleModal,setVisibleModal,
  // eslint-disable-next-line no-unused-vars
  offProductporcentaje,setOffProductPorcentaje
}) {
  
    const handleVisible = () => {
      setVisibleModal({
        visible: !visibleModal.visible,
        id:product.id
      })
    }
    const noAplica = () => {
      const newProductChange = {productId: product.id,offPorcentaje: 0}
      console.log(newProductChange)
      offPorcentaje(newProductChange)
      setVisibleModal({
        visible: !visibleModal.visible,
        id: '',
      })
    }
    const handleOffPorcentaje = () => {
      const newProductChange = {productId: product.id,offPorcentaje: offProductporcentaje}
      console.log(newProductChange)
      offPorcentaje(newProductChange)
      setVisibleModal({
        visible: !visibleModal.visible,
        id: '',
      })
    } 
     const handleChange = (e) => {
      e.preventDefault()
      setOffProductPorcentaje(e.target.value)
    }  
    return (
    <section>
     <li className="bg-gray-700 p-3 flex rounded-lg shadow-lg px-10 my-2 
    hover:cursor-pointer justify-between">
      <div className="flex  flex-col w-1/3 justify-between sm:flex-row">
        <div className="flex flex-col">
          <strong>{product.title} {product.description}</strong>
          <p>
           ${product.price}
            </p> 
        </div>
        <div>
            {product.off && <div className="flex flex-col justify-center items-center mt-2w-full">
                                <p>{product.off} %</p>
                                <p>valor $ {product.price_off}</p>
                                <button onClick={handleVisible} 
              className="bg-slate-200 hover:bg-slate-300 text-black 
          font-bold py-2 px-4 rounded-lg m-4">modifica</button>
                            </div>
            }                            
            {!product.off &&   <button onClick={handleVisible} 
              className="bg-slate-200 hover:bg-slate-300 text-black 
          font-bold py-2 px-4 rounded-lg m-4">Descuento</button>}
              
          {
            (visibleModal.visible && visibleModal.id === product.id) && 
              <div>
                <p>si el producto aplica algun descuento introducir el porcentaje y presione aceptar, caso contrario presione cancelar</p>
                 <input
                      type="text"
                      name="off"
                      placeholder="Write discount"
                      className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
                      onChange={handleChange}
                      value={offProductporcentaje}
                      autoFocus
                      />
                <div> 
                  <button onClick={handleOffPorcentaje}
                  className="bg-slate-200 hover:bg-slate-300 text-black 
                  font-bold py-2 px-4 rounded-lg m-4">Aceptar</button>
                  <button onClick={noAplica}
                  className="bg-slate-200 hover:bg-slate-300 text-black 
                  font-bold py-2 px-4 rounded-lg m-4">No aplica</button>
                </div>
              </div>
          }
        </div>
      </div>
      <div className="flex justify-end items-center ">
        <div>
          <button onClick={discountToCart} 
            className="mx-4 w-8 bg-slate-300 hover:bg-red-300 rounded-lg">-</button>
            <span>{product.quantity}</span>
          <button onClick={addToCart}
            className="mx-4  w-8 bg-slate-300 hover:bg-red-300 rounded-lg">+</button>
        </div>
      </div>

    </li>
    </section>
  )
}

export default ShoppingItems