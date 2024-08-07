import { useEffect, useState } from "react"


function EditModel({onClose, product}) {
    const [productEdit,setProductEdit] = useState({
        title: product.title,
        price: product.price,
        description: product.description,
    })

    useEffect(()=>{
        setProductEdit({
            title: product.title,
            price: product.price,
            description: product.description,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChange = (e) => {
        setProductEdit({...productEdit, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onclose(true)
         /*    try { 
            const res = await fetch(
                `https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a/id/${product.id}`,
                {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: product.id,
                    title:productEdit.title,
                    description:productEdit.description,
                    price:productEdit.price,
                    category: product.category,
                    quantity:product.quantity,
                }),
                }
            );
            if (res.ok) {
                alert("se cambiaron los datos del producto")
                onClose(true)
            }
            } catch (error) {
            console.log(error);
            } */
            }

    return (
        <aside className="fixed z-50 top-0 left-0 w-full min-h-[100vh] bg-[rgba(0,0,0,0.75)] 
        flex justify-center " >
            <div className="flex flex-col justify-center items-center ">
                <div className="w-full flex justify-end">
                    <button onClick={()=>onClose()} className=" bg-slate-200 hover:bg-slate-300 text-black 
                    font-bold py-2 px-4 rounded-lg my-2 ">
                    X</button>
                </div>
                <form action="" className="w-[90vw]">
                    <input
                    type="text"
                    name="title"
                    placeholder="Write your title"
                    className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
                    onChange={handleChange}
                    value={productEdit.title}
                    autoFocus
                    />
                    <input
                    type="text"
                    name="price"
                    placeholder="Write price"
                    className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
                    onChange={handleChange}
                    value={productEdit.price}
                    autoFocus
                    />  
                    <textarea
                    name="description"
                    rows={4}
                    placeholder="Write your description"
                    className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
                    onChange={handleChange}
                    value={productEdit.description}
                    ></textarea>
                    <div>
                        <button 
                            onClick={handleSubmit}
                            disabled={productEdit.title.trim() == '' 
                                || productEdit.price.trim() == ''
                                || productEdit.description.trim() == ''
                            }>Aceptar</button>
                    </div>
                </form>
            </div>
        </aside>
    
  )
}

export default EditModel