import { Route , Routes} from 'react-router-dom'
import NavBar from './components/navBar'
import ProductList from './components/ProductList'
import EditSheet from './components/editSheet'
import AddSheet from './components/addSheet'
import { ProductProvider } from './context/product.jsx'

function App() {
 
  return (
    <>
      <ProductProvider>

       <NavBar></NavBar>
    
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/products/new' element={<AddSheet/>}/>
          <Route path='/products/:id' element={<EditSheet/>}/>
        </Routes>
      </ProductProvider>
    
    </>
  )
}

export default App
