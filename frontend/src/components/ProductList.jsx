import {useState, useEffect} from "react"
import ProductCard from "./ProductCard"

function ProductList() {
  const [ products, setProducts] = useState([])
  const [verTodo , setVerTodo ] = useState(false);
  const [productsFiltered , setProductsFiltered] = useState(products);

  const loadProducts = async () => {
    const response = await fetch("http://localhost:3000/",)
    const data = await response.json();
    setProducts(data)
  }

  useEffect(()=>{ 
    loadProducts()
    setProductsFiltered(products)
    if(!verTodo) filtrarVisibles()
    },[verTodo])
  
  const handlerVerTodo = () => {
    setVerTodo(!verTodo)
  }
  
  const filtrarVisibles = () =>{
    const dataFiltered = products.filter(product => product.visibility == true)
    setProductsFiltered(dataFiltered)
    console.log(dataFiltered)
  }
  
  return (
    <>
    <label >
    <input type="checkbox"
    checked={verTodo}
    onChange={handlerVerTodo}
    />
      Ver todo
    </label>
      {
        productsFiltered.map((product,index)=>(
        <ProductCard key={index} product={product} />            
        ))
      }
    </>
  )
}

export default ProductList