import React,{createContext, useContext, useState, useEffect} from "react";
import {toast} from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);


    const incQty = () => {
        setQty(prevQty => prevQty + 1)
    }
    const decQty = () => {
        setQty(prevQty => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1
        }
        )
    }
    
    const onAdd = (qty, product) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id)

        if (checkProductInCart){
            setTotalPrice(prevTotalPrice => prevTotalPrice + qty * product.price);
            setTotalQuantities(prevTotalQty => prevTotalQty + qty)

            const updatedCartItems = cartItems.map(cartProduct => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + qty
                }
            })

            setCartItems(updatedCartItems)
            
        }else{
            setTotalPrice(prevTotalPrice => prevTotalPrice + qty * product.price);
            setTotalQuantities(prevTotalQty => prevTotalQty + qty)
            product.quantity = qty
            
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to cart`) 
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart
            }}
        >
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context)