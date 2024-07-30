import {AppBar, Toolbar, Typography } from "@mui/material"
import {Link , useNavigate, useLocation} from "react-router-dom"
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

function NavBar() {
  
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppBar position="static" color="transparent">
                <Toolbar>
                    <Typography sx={{flexGrow:1}}>
                      {/* Se deve solucionar bug en eliminar del json y agregar al carrito principar  
                      <Link to={'/productsOptions'}>
                            <button
                            className="bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded-lg my-2"
                            >elegir productos</button>
                        </Link> */}
                        <Link to={'/'}>SUPER</Link></Typography>
                        <Link to={'/cart'}>
                        <button
                                className="bg-slate-200 hover:bg-slate-300 text-black font-bold
                                 py-2 px-4 rounded-lg my-2 mx-4"
                                onClick={() => navigate("/")}
                                >
                                    <MdOutlineShoppingCartCheckout />
                                </button>
                        </Link>
                         {location.pathname === "/products/new" || location.pathname.includes('/products/') ? (
                                <button
                                className="bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded-lg my-2"
                                onClick={() => navigate("/")}
                                >
                                Go back
                                </button>
                            ) : (
                                <button
                                className="bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded-lg my-2"
                                onClick={() => navigate("/products/new")}
                                >
                                Add Product
                                </button>
                            )}

                            
                </Toolbar>
        </AppBar>
  )
}

export default NavBar