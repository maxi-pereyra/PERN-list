import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ProductSheetsForms() {
  const Navigate = useNavigate("/")
    const [product,setProduct] = useState({
        title:'',
        description:'',
        price:'',
        category:'',
      })
    
    const handlerChange = (e) => setProduct({...product, [e.target.name]: e.target.value})
  
    const submit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', product.title);
        data.append('description', product.description);
        data.append('price', product.price);
        data.append('category', product.category);
        
      console.log("envio>",data)
        const Sheet_Url="https://script.google.com/macros/s/AKfycbwifm97lTukqHRk1dNJ_eabZ4eSjELTMMaJI9HJTzM0CqzgeN3_vcat_OMgwcgCQYJ8gw/exec"
         try {
           let response = await fetch(Sheet_Url,{
            method: 'POST',
            body: data,
            muteHttpExceptions: true 
           })
          let res = await response.json()
          console.log(res)
          setProduct({
            title:'',
            description:'',
            price:'',
            category:'',
          })
          Navigate("/")
        } catch (error) {
            console.log(error)
        }

    }
    return (
    <div  className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <form className="form" onSubmit={(e)=>submit(e)}>
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
        <select name="category" id="" 
        className="border border-gray-400 p-2 rounded-md block my-2 w-full text-gray-800"
        onChange={handlerChange}
        placeholder="category">
          <option selected>seleccionar categoria</option>
          <option value="limpieza">limpieza</option>
          <option value="higiene">higiene</option>
          <option value="alimentos">alimentos</option>
        </select>
      </div>

        <input type="submit" className="button" />

        </form>

    </div>
  )
}

export default ProductSheetsForms