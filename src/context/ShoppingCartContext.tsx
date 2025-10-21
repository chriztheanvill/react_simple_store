import { createContext, useContext, useState, type ReactNode } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    get_item_quantity: (id: number) => number
    increase_cart_quantity: (id: number) => void
    decrease_cart_quantity: (id: number) => void
    remove_from_cart: (id: number) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function use_shopping_cart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider( { children }: ShoppingCartProviderProps){
    const [cart_items, set_cart_items] = useState<CartItem[]>([])

    function get_item_quantity(id: number){
        return cart_items.find(item => item.id === id)?.quantity || 0
    }

    function increase_cart_quantity (id: number) {
        set_cart_items(current_items => {
            if(current_items.find(item => item.id === id) == null){
                return [...current_items, {id, quantity: 1}]
            }else{
                return current_items.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function decrease_cart_quantity (id: number) {
        set_cart_items(current_items => {
            if(current_items.find(item => item.id === id)?.quantity === 1){
                return current_items.filter(item => item.id !== id)
            }else{
                return current_items.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function remove_from_cart (id: number) {
        set_cart_items(current_items =>{
            return current_items.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ 
            get_item_quantity, 
            increase_cart_quantity, 
            decrease_cart_quantity, 
            remove_from_cart 
            }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}