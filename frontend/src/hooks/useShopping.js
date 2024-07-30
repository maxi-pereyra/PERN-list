import { useContext } from "react";
import { shoppingContext } from "../context/shopping";

export const useShopping = () => {
    const context = useContext(shoppingContext);

    if(context == undefined){
        throw new Error(' revisar configuracion de shoppingprovider')
    }

    return context
}