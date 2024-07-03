import {useState, useEffect, useContext} from "react"
import ProductCard from "./ProductCard"
import { productsContext } from "../context/product";
function ProductList() {
  //const [productsFiltered , setProductsFiltered] = useState(products);
  const { products , getProducts} = useContext(productsContext)
  const [ productsFilter, setProductsFilter] = useState([])
  
 console.log(products)
  useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProduct = (event) => {
    console.log(event.target.value)
    if(event.target.value=='todos'){
      setProductsFilter(products)
    }else{
      const filterProduct = products.filter(element => element.category == event.target.value);
      console.log("filtered",filterProduct)
      setProductsFilter(filterProduct)
    }
  }

  return (
    <>
    <select name="category" id="" 
            className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
            onChange={filteredProduct}
            placeholder="categories" >
              <option value="todos">todos</option>
              <option value="limpieza">limpieza</option>
              <option value="higiene">higiene</option>
              <option value="alimentos">alimentos</option>
            </select>
      {
        productsFilter?.map((product,index)=>(
        <ProductCard key={index} product={product} />            
        ))
      }
    </>
  )
}

export default ProductList