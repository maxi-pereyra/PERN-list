import { Route , Routes} from 'react-router-dom'
import NavBar from './components/navBar'
import ProductList from './components/ProductList'
import EditSheet from './components/editSheet'
//import AddSheet from './components/addSheet'
import { ProductProvider } from './context/product.jsx'
import { ShoppingProvider } from './context/shopping.jsx'
import Shopping from './components/shopping.jsx'
import ProductSheetsForms from './components/forms/productSheetsForms.jsx'

function App() {
 
  return (
    <>
      <ProductProvider>
      <ShoppingProvider>
       <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/products/new' element={<ProductSheetsForms/>}/>
          <Route path='/products/:id' element={<EditSheet/>}/>
          <Route path='/cart' element={<Shopping/>}/>

        </Routes>
      </ShoppingProvider>
      </ProductProvider>
    
    </>
  )
}

export default App
