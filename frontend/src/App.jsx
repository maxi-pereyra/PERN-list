import { Route , Routes} from 'react-router-dom'
import NavBar from './components/navBar'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm' 
import ProductsOptions from './components/ProductsOptions'

function App() {
 
  return (
    <>
    <NavBar></NavBar>
    
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/products/new' element={<ProductForm/>}/>
          <Route path='/products/:id' element={<ProductForm/>}/>
          <Route path='/productsOptions' element={<ProductsOptions/>}/>
        </Routes>
    
    </>
  )
}

export default App
