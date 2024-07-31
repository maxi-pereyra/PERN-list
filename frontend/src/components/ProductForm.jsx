import { useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router-dom"

function ProductForm() {

  const [product,setProduct] = useState({
    title:'',
    description:'',
    price:'',
    categories:'',
  })
  
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handlerSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      if(params.id){
        const response = await fetch('http://localhost:3000/products/'+params.id.slice(1),{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
       await response.json()

      }else{
        if(JSON.parse(window.localStorage.getItem('product'))){
            let product = JSON.parse(window.localStorage.getItem('product'))
            console.log("product", product)
            const response = await fetch('http://localhost:3000/products/',{
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(product),
            })
             await response.json()   
             localStorage.removeItem('product');
        }else{
          const response = await fetch('http://localhost:3000/products/',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          })
           await response.json()
        }
      }
      setLoading(false)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    if (params.id) {
      loadProduct(params.id.slice(1))
    }  
    if(JSON.parse(window.localStorage.getItem('product'))){
      let product = JSON.parse(window.localStorage.getItem('product'));
      loadProductjson(product)
    }
  },[params.id])

  const loadProduct = async (id) => {
    const res = await fetch("http://localhost:3000/products/" + id);
    const data = await res.json();
    setProduct({ title:data.title, description:data.description,price:data.price, categories:data.categories})
  }
  const loadProductjson = (product) =>{
    setProduct({
      title: product.title,
      description: product.description,
      price: product.price,
      categories: product.categories
    })
  }
  
  const handlerDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/products/${id}`,{
        method: "DELETE"
      });
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  const handlerChange = (e) => setProduct({...product, [e.target.name]: e.target.value})
  
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
    <form onSubmit={handlerSubmit} className="w-2/5">
      <h3 className="font-bold text-2xl my-3 ">
        {params.id ? "Update Task" : "Create Task"}
      </h3>
      <div className="flex flex-col">
        <input
          type="text"
          name="title"
          placeholder="Write your title"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full text-gray-800"
          onChange={handlerChange}
          value={product.title}
          autoFocus
        />
        <textarea
          name="description"
          rows={4}
          placeholder="Write your description"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full text-gray-800"
          onChange={handlerChange}
          value={product.description}
        ></textarea>
        <input
          type="text"
          name="price"
          placeholder="Write price"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full text-gray-800"
          onChange={handlerChange}
          value={product.price}
          autoFocus
        />  
        <select name="categories" id="" 
        className="border border-gray-400 p-2 rounded-md block my-2 w-full text-gray-800"
        onChange={handlerChange}
        placeholder="categories">
          <option value="limpieza">limpieza</option>
          <option value="higiene">higiene</option>
          <option value="alimentos">alimentos</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={!product.title || !product.description}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading
            ? // <CircularProgress color="inherit" size={25} />
              loading
            : "Save"}
        </button>

        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={() => handlerDelete(params.id.slice(1))}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  </div>
  )
}

export default ProductForm