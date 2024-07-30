import {useState, useEffect, useContext} from "react"
import ProductCard from "./ProductCard"
import { productsContext } from "../context/product";
function ProductList() {
  //const [productsFiltered , setProductsFiltered] = useState(products);
  const { products , getProducts} = useContext(productsContext)
  const [ productsFilter, setProductsFilter] = useState([])
  const [ query, setQuery ] = useState('')
  
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

  const handleBuscar = (event) => {
    setQuery(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("buscando", query)
  }

  return (
    <>
     <form onSubmit={handleSubmit} className="w-full  flex justify-around mt-5 mb-4 ">
       <button type="submit" className="bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded-lg my-2">Buscar</button>
            <input
                type="text"
                value={query}
                onChange={handleBuscar}
                placeholder="Buscar..."
                className="text-black m-2 text-center"
            />
        </form>
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
        productsFilter?.map((product)=>(
        <ProductCard key={product.id} product={product} />            
        ))
      }
    </>
  )
}

export default ProductList