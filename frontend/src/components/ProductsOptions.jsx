import { useState, useEffect } from "react";
import ProductCardOptions from "./ProductCardOptions";
function ProductsOptions() {
  
    const [products, setProducts] = useState()
    const [ selectOptions , setSelectOptions] = useState("");
      
  // eslint-disable-next-line no-undef
  useEffect(()=>{
    const loadProductsOptions = async () => {
        const response = await fetch(`http://localhost:3000/api-lista?product=${selectOptions}`)
        const data = await response.json();
        setProducts(data)
      }
    loadProductsOptions()
  },[selectOptions])

  console.log(products)
    return (
    <div>
      <div className="ml-10">
        <select 
            defaultValue="nada"
            value={selectOptions}
            onChange={(e)=>{
            console.log(e.target.value)
            setSelectOptions(e.target.value)}}
             className="text-black">
          <option value="higiene">Higiene</option>
          <option value="alimentos">Alimentos</option>
          <option value="limpieza">Liempieza</option>
        </select>
      </div>
            {
        products?.map((product,index)=>(
          <ProductCardOptions key={index} product={product} />
        ))
      }
    </div>
  )
}

export default ProductsOptions