import {  createContext , useState} from "react";

export const productsContext = createContext();

export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState(null);

    const getProducts = async () =>{
        try {
            const res = await fetch(
              "https://sheet.best/api/sheets/db0170a7-feff-477c-bc4f-81ad7bafe17a"
            );
            const data = await res.json();
            //setData(Object.keys(data).map((key) => data[key]));
            console.log(data)
            setProducts(data)
          } catch (error) {
            console.log(error);
          }
    }

    return(
        <productsContext.Provider value={{products , getProducts}}>
            {children}
        </productsContext.Provider>
    )
}
