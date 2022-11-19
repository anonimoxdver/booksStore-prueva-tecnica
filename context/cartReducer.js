import { types } from './types/types'

export const cartReducer = ( state = {} , action ) => {

    switch (action.type) {
        case types.AddBook:
            return {
                ...state,
                cart: [ ...action.payload ]
            }
        case types.UpdateOrder:
            return {
                ...state,
                ...action.payload
            }
        case types.deleteBook:
            return {
                ...state,
                cart: state.cart.filter( book => !(book.isbn13 === action.payload.isbn13  ))
            }

        case types.createOrder:
            return {
               ...state,
                cart: [],
               numberOfItems: 0,
               subTotal: 0,
               tax: 0,
               total: 0
            }
    
        default:
            return state
    }
}