

const ModalPrcentaje = ({product, offPorcentaje, visibleModal, setVisibleModal}) => {
    //const [productEdit,setProductEdit] = useState(product);
    //si no uso un estado aux para modificarlo??
    const handleOff = () => {
      offPorcentaje(product)
      setVisibleModal({
        visible: !visibleModal.visible,
        id: '',
      })
    }/* 
    const handleChange = (e) => {
      setProductEdit({...productEdit, [e.target.name]: e.target.value})
    } */
    return (
      <>
        {
          (visibleModal.visible && product.id == visibleModal.id ) && 
            <div className="fixed z-50 top-0 left-0 w-full min-h-[100vh] bg-[rgba(0,0,0,0.75)] 
          flex justify-center ">
              <div>
                <p>Este producto aplica algun descuento, si es asi introdusca el numero en porcentaje, caso 
                  contrario pecione cancelar
                </p>
                <input
                      type="text"
                      name="off"
                      placeholder="Write discount"
                      className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
                      //onChange={}
                      value={product.off}
                      autoFocus
                      /> 
                <div>
                  <button onClick={handleOff}>Aceptar</button>
                  <button onClick={()=>setVisibleModal({
                    visible: !visibleModal.visible,
                    id: '',
                  })}>Cancelar</button>
                </div>
              </div>
            </div>
        }
      </>
    )
  }

  export default ModalPrcentaje