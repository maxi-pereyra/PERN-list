import { NavLink } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function ProductCard({product}) {

   // const navigate = useNavigate()
    const handlerDelete = async () => {
      product.visibility = !product.visibility;
      
      const response = await fetch('http://localhost:3000/products/'+product.id,{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
      await response.json()
    
    }

  return (
    <div className="bg-gray-700 p-3 flex justify-between rounded-lg shadow-lg px-10 my-2 hover:cursor-pointer hover:bg-slate-300">
      <div>
          <h3 className="font-bold text-xl">{product.title}  <span className="text-xs"> {product.categories}</span></h3>
          <div className="flex m-1">
              <p className="mr-2">{product.description} </p>
              <span>(precio ultimo: {product.price})</span>
          </div>
      </div>
      <div className="">
        <NavLink to={`/products/:${product.id}`}>
          <button
          className="bg-slate-200 hover:bg-slate-300 text-black 
          font-bold py-2 px-4 rounded-lg m-2"
          >
          edit
          </button>
        </NavLink>
        {
          product.visibility? (
            <button
            className="bg-green-500 hover:bg-green-400 text-black 
            font-bold py-2 px-4 rounded-lg m-2"
            onClick={handlerDelete}>
            al carrito
            </button>
          ) : 
          (
            <button
            className="bg-red-500 hover:bg-red-400 text-black 
            font-bold py-2 px-4 rounded-lg m-2"
            onClick={handlerDelete}>
              carrito output
            </button>
          )
        }
      </div>
    </div>
  )
}

export default ProductCard