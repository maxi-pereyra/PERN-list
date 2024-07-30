import { useReducer, createContext } from "react";
import { shoppingReducer, shoppingInitialState } from "../reducers/shoppingReducer";
import { TYPES } from "../actions/shoppingActions";

// eslint-disable-next-line react-refresh/only-export-components
export const shoppingContext = createContext();

function useShoppingReducer () {
    const [state,dispatch] = useReducer(shoppingReducer,shoppingInitialState);

    const addToCart = (product) => dispatch({
        type:TYPES.ADD_TO_CART,
        payload: product
    })

    const removeToCart = (product) => dispatch({
        type:TYPES.REMOVE_ONE_FROM_CART,
        payload: product
    })

    const clearToCart = () => dispatch({type: TYPES.CLEAR_CART}) 

    const discountToCart = (product) => dispatch({type: TYPES.DISCOUNT_TO_CART,
        payload: product
    })
    return {state,addToCart,removeToCart,clearToCart,discountToCart}
}

export function ShoppingProvider ({children}) {
    const {state, addToCart, removeToCart, clearToCart, discountToCart} = useShoppingReducer();

    return(
        <shoppingContext.Provider value={{
            cart:state,
            addToCart,
            removeToCart,
            clearToCart,
            discountToCart
        }}>
            {children}
        </shoppingContext.Provider>
    )
}

