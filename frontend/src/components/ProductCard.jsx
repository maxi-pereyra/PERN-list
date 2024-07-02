import { useState } from "react";
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function ProductCard({product}) {
  const navigate = useNavigate()
  const [checked , setChecked] = useState(product.check);
  
    const handleCheckBoxChange = async () => {
      if(checked){
        try { 
          const res = await fetch(
            `https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a/${product.id}`,
            {
              method: "PUT",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: product.id,
                title:product.title,
                description:product.description,
                price:product.price,
                categories:product.categories,
                cartList:'false',
                check:'true',
              }),
            }
          );
          console.log("res",res.body);
        } catch (error) {
          console.log(error);
        }
      }else{
        try { 
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
                title:product.title,
                description:product.description,
                price:product.price,
                categories:product.categories,
                cartList:'false',
                check:'false',
              }),
            }
          );
          console.log("res",res.body);
        } catch (error) {
          console.log(error);
        }
      }
      setChecked(!checked);
  };

    const handlerOut = async () => {
      
      try { 
        const res = await fetch(
          `https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a/${product.id}`,
          {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: '=ROW(A3)-2',
              title:product.title,
              description:product.description,
              price:product.price,
              categories:product.categories,
              cartList:'false',
              check:'false',
            }),
          }
        );
        console.log("res",res.body);
        if (res.ok) {
          navigate("/")
        }
      } catch (error) {
        console.log(error);
      }
      

    }

    const handlerIn = async () => {
      
      try { 
        const res = await fetch(
          `https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a/${product.id}`,
          {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: '=ROW(A3)-2',
              title:product.title,
              description:product.description,
              price:product.price,
              categories:product.categories,
              cartList:'true',
              check:'false',
            }),
          }
        );
        console.log("res",res.body);
        if (res.ok) {
          navigate("/")
        }
      } catch (error) {
        console.log(error);
      }

    }


  return (
    <div className="bg-gray-700 p-3 flex flex-col  rounded-lg shadow-lg px-10 my-2 
    hover:cursor-pointer sm:flex-row justify-between">
      <div>
          <h3 style={{ textDecoration: !checked ? 'line-through' : 'none' ,
           color: !checked ? 'red' : ''}} className="font-bold text-xl">{product.title}  <span className="text-xs"> {product.categories}</span></h3>
          <div className="flex m-1">
              <p className="mr-2">{product.description} </p>
              <span>(precio ultimo: {product.price})</span>
          </div>
      </div>
      <div className="mr-4 px-4">
        <NavLink to={`/products/:${product.id}`}>
          <button
          className="bg-slate-200 hover:bg-slate-300 text-black 
          font-bold py-2 px-4 rounded-lg m-4 "
          >
          edit
          </button>
        </NavLink>
        {/*
          product.cartList === 'FALSE'? (
            <button
            className="bg-green-500 hover:bg-green-400 text-black 
            font-bold py-2 px-4 rounded-lg m-2"
            onClick={handlerIn}>
            in
            </button>
          ) : 
          (
            <button
            className="bg-red-500 hover:bg-red-400 text-black 
            font-bold py-2 px-4 rounded-lg m-2"
            onClick={handlerOut}>
              out
            </button>
          )
        */}
        <input
                type="checkbox"
                className="size-6 ml-6 " 
                checked={!checked}
                onChange={handleCheckBoxChange}
            />
            <label style={{ textDecoration: !checked ? 'line-through' : 'none' }}></label>
      </div>
    </div>
  )
}

export default ProductCard