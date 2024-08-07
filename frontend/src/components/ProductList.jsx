import {useState, useEffect} from "react"
import ProductCard from "./ProductCard"
import { fetchDataCsv } from '../api/api.sheets'

function ProductList() {
  const [visible,setVisible] = useState({
    visible: false,
    id: ''
  })
  const [ productsFilter, setProductsFilter] = useState([])
  const [search , setSearch] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [csvData, setcsvData] = useState();

  const getData = async () =>{
    let response = await fetchDataCsv()
    setcsvData(response)
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProduct = (event) => {

    if(event.target.value=='todos'){
      setProductsFilter(csvData)
    }else{
      const filterProduct = csvData.filter(element => element.category == event.target.value);
      setProductsFilter(filterProduct)
    }
  }

  const handleBuscar = () => {
    setProductsFilter(csvData.filter(element => element.title.toLowerCase().includes(search.toLowerCase())))
  }

  const handleModalClose = (shouldUpdate) => {
    if(shouldUpdate){
      getData()
    }
    setVisible({
      visible: !visible.visible,
      id: ''
    })
  }

  return (
    <> 
       <button type="submit"
               className="bg-slate-200 hover:bg-slate-300 text-black font-bold py-2
       px-4 rounded-lg my-2"
                onClick={handleBuscar}
                disabled={csvData ? true : false}>Buscar</button>
            <input
                type="text"
                value={search}
                onChange={(event)=>{event.preventDefault();setSearch(event.target.value)}}
                placeholder="Buscar..."
                className="text-black m-2 text-center"
            />
    <select name="category" id="" 
            className="border border-gray-400 p-2 rounded-md block my-2 w-full text-black"
            onChange={filteredProduct}
            placeholder="categories" >
              <option value="todos">todos</option>
              <option value="limpieza">limpieza</option>
              <option value="higiene">higiene</option>
              <option value="alimentos">alimentos</option>
            </select>
      {
        productsFilter?.map((product)=>(
                                        <ProductCard key={product.id} 
                                          product={product} 
                                          onClose={handleModalClose} 
                                          visible={visible} 
                                          setVisible={setVisible}/>            
                                        ))
      }
    </>
  )
}

export default ProductList