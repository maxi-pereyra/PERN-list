import { useParams , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";


function EditSheet () {

    const { id } = useParams();
    const navigate = useNavigate();

  const [loading,setLoading] = useState(false)

  const [product, setData] = useState({
    id: '',
    title:'',
    description:'',
    price:'',
    category:'',
    cartList:'',
    check:'',
  });


  
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a/id/${id.slice(1)}`
        );
        const data = await res.json();
        console.log("data",data)
        setData(data[0]);
      } catch (error) {
        console.log(error.message);
      }
  
      setLoading(false)
    };
    getData();
  }, [id]);

  const handleChange = (e) =>
    setData({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("envio",product)
    try { 
      const res = await fetch(
        `https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a/id/${id.slice(1)}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id.slice(1),
            title:product.title,
            description:product.description,
            price:product.price,
            category:product.category,
            cartList:'false',
            check:'false',
          }),
        }
      );
      if (res.ok) {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerDelete = async () => {
    try {
      const res = await fetch(`https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a/id/${id.slice(1)}`, {
          method: "DELETE",
        }
      );
      console.log("res",res);
      if (res.ok) {
        navigate("/")
      }
    } catch (error) {
      console.error(error);
      
    }
  }
    return (
        <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-2/5">
          <h3 className="font-bold text-2xl my-3 ">
            {id ? "Update Task" : "Create Task"}
          </h3>
          <div className="flex flex-col">
            <input
              type="text"
              name="title"
              placeholder="Write your title"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
              onChange={handleChange}
              value={product?.title}
              autoFocus
            />
            <textarea
              name="description"
              rows={4}
              placeholder="Write your description"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
              onChange={handleChange}
              value={product?.description}
            ></textarea>
            <input
              type="text"
              name="price"
              placeholder="Write price"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
              onChange={handleChange}
              value={product?.price}
              autoFocus
            />  
            <select name="category" id="" 
            className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
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
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading
                ? // <CircularProgress color="inherit" size={25} />
                  loading
                : "Save"}
            </button>
    
            {id && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                onClick={() => handlerDelete(id.slice(1))}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
      )
}

export default EditSheet;
