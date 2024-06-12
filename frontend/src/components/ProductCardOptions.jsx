
import { NavLink } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function ProductCardOptions({product}) {
    
   // const navigate = useNavigate()
    const handlerDelete = async () => {
      console.log(product)
      const response = await fetch('http://localhost:3000/delete-product-json',{
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
      await response.json()
      
    }

    const addToList = (product) => {
      window.localStorage.setItem('product', JSON.stringify(product))
    }

  return (
    <div className="bg-gray-700 p-3 flex justify-between rounded-lg shadow-lg px-10 my-2 hover:cursor-pointer hover:bg-slate-300">
      <div>
          <h3 className="font-bold text-xl">{product.description}  <span className="text-xs"> {product.categories}</span></h3>
          <div className="flex m-1">
              <p className="mr-2">{product.title} </p>
              <span>(precio ultimo: {product.price})</span>
          </div>
      </div>
      <div className="">
        <NavLink to={`/products/:${product.id}`}>
          <button
          className="bg-green-200 hover:bg-green-300 text-black 
          font-bold py-2 px-4 rounded-lg m-2"
          onClick={addToList(product)}
          >
          agregar al listao
          </button> 
        </NavLink>
        <button
            className="bg-red-500 hover:bg-red-400 text-black 
            font-bold py-2 px-4 rounded-lg m-2"
            onClick={handlerDelete}>
            eliminar
        </button>
       
      </div>
    </div>
  )
}

export default ProductCardOptions