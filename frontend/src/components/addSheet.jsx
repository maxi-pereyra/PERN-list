import { useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import { productsContext } from "../context/product";

function AddSheet () {

  const navigate = useNavigate();

  const [loading,setLoading] = useState(false)
  const { products } = useContext(productsContext)
  console.log(products.length)
  const ultimo = products[products.length-1];

  const [product, setData] = useState({
    id: parseInt(ultimo.id) + 1,
    title:'',
    description:'',
    price:'',
    category:'',
    cartList:'false',
    check:'false',
  });

  const handleChange = (e) =>
    setData({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("envio",product)
    setLoading(true)
    try {
        const res = await fetch(
          "https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        if (res.ok) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
  };
    return (
        <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-2/5">
          <h3 className="font-bold text-2xl my-3 ">
            crear
          </h3>
          <div className="flex flex-col">
            <input
              type="text"
              name="title"
              placeholder="Write your title"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full text-white"
              onChange={handleChange}
              value={product?.title}
              autoFocus
            />
            <textarea
              name="description"
              rows={4}
              placeholder="Write your description"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full text-white"
              onChange={handleChange}
              value={product?.description}
            ></textarea>
            <input
              type="text"
              name="price"
              placeholder="Write price"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full text-white"
              onChange={handleChange}
              value={product?.price}
              autoFocus
            />  
            <select name="category" id="" 
            className="border border-gray-400 p-2 rounded-md block my-2 w-full text-white"
            onChange={handleChange}
            placeholder="category" >
              <option >category</option>
              <option value="limpieza">limpieza</option>
              <option value="higiene">higiene</option>
              <option value="alimentos">alimentos</option>
            </select>
          </div>
    
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={!product?.title || !product?.description}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading
                ? // <CircularProgress color="inherit" size={25} />
                  loading
                : "Save"}
            </button>
    
          </div>
        </form>
      </div>
      )
}

export default AddSheet;
