import { createContext, useContext, useEffect, useState } from "react";


const CartContext=createContext();

export function CartProvider({children}){
    const [cart,setCart]=useState(()=>{
        const savedCart=localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart):[];
    });
    
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart));
    },[cart]);

    function addToCart(pizza,quantity){
        setCart((currentCart)=>{
            const existingItem=currentCart.find((item)=>item.id===pizza.id);
            if(existingItem){
                return currentCart.map((item)=>
                    item.id===pizza.id ? {...item,quantity: item.quantity + quantity}: item
                )
            }
            return [...currentCart,{...pizza,quantity}]
        })
    }

    function updateQuantity(id,quantity){
        setCart((currentCart)=>
        currentCart.map((item)=>
        item.id === id ? {
            ...item,quantity:Math.max(1,quantity)
        }:
            item
        )
        )
    }
    function removeFromCart(id){
        setCart((currentCart)=>
            currentCart.filter((item)=>item.id !==id)
        )
    }


    return (
        <CartContext.Provider value={{cart,setCart,addToCart,updateQuantity,removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext);
}