import { useEffect, useReducer } from "react";
import { databaseApi } from "../api";
import { CartContext } from "./CartProvider"
import { cartReducer } from "./cartReducer";
import { types } from "./types/types";


const CART_INITIAL_STATE = {
    isPaid: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
}

export const CartProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer( cartReducer, CART_INITIAL_STATE );


    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.cantidad + prev , 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => (current.precio * current.cantidad) + prev, 0 );

    
        const orderSummary = {
            numberOfItems,
            subTotal,
        }

        dispatch({ type: types.UpdateOrder, payload: orderSummary });
    }, [state.cart]);

    const addProductToCart = ( product ) => {

        const productInCart = state.cart.some( p => p.isbn13 === product.isbn13 );
        if ( !productInCart ) return dispatch({ type: types.AddBook, payload: [...state.cart, product ] })



        const updatedProducts = state.cart.map( p => {
            if ( p.isbn13 !== product.isbn13 ) return p;


            p.cantidad += product.cantidad;
            return p;
        });

        dispatch({ type: types.AddBook, payload: updatedProducts });

    }

    const removeBook = ( book ) => {
        dispatch({ type: types.deleteBook, payload: book });
    }


    const createOrder = async()=> {

        const body = {
            orderItems: state.cart,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            isPaid: false,
            message: 'this is a message'
        }

          


            const {data} = await databaseApi.post('/orders', body);

             const {data: session} = await databaseApi.post('/orders/pay', body);


            dispatch({ type: types.createOrder });

            return {
                hasError: false,
                message: data,
                message2: session
            }


 

    }

    return (
        <CartContext.Provider value={{
            ...state,

            addProductToCart,
            removeBook,
            createOrder

        }}>
            { children }
        </CartContext.Provider>
    )
}