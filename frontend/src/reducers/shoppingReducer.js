import { TYPES } from "../actions/shoppingActions"

export const shoppingInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

export function shoppingReducer(state,action) {
    const {type,payload} = action
    
    switch(type){
        case TYPES.ADD_TO_CART:{
            const {id} = payload;
            console.log("id",id)
            const productInCart = state.findIndex(item => item.id == id);
            console.log("add",productInCart)

            if(productInCart >= 0){
                const newState = [
                    ...state.slice(0,productInCart),
                    {...state[productInCart],quantity: state[productInCart].quantity + 1},
                    ...state.slice(productInCart+1)
                ]
                updateLocalStorage(newState)
                return newState;
            }

            const newState = [
                ...state,
                {
                    ...payload,
                    quantity: 1
                }
            ]

            updateLocalStorage(newState)
            return newState
        }
        case TYPES.DISCOUNT_TO_CART:{
            const {id} = payload;
            const productInCart = state.findIndex(item => item.id == id)
                
            if(state[productInCart].quantity > 1){
               
                const newState = [
                    ...state.slice(0,productInCart),
                    {...state[productInCart],quantity: state[productInCart].quantity - 1},
                    ...state.slice(productInCart+1)
                ]
                updateLocalStorage(newState)
                return newState;
            }

            const newState = [
                ...state,
            ]

            updateLocalStorage(newState)
            return newState
        }
        case TYPES.REMOVE_ONE_FROM_CART:{
            const {id} = payload;
            const newState = state.filter(item => item.id !== id);
            updateLocalStorage(newState)
            return newState;
        }
        case TYPES.CLEAR_CART:{
            updateLocalStorage([])
            return [];
        }
        default: 
            return state;
    }
}

