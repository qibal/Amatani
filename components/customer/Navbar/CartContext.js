'use client'
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0)
    const [userId, setUserId] = useState(null)

    async function fetchCartCount(user_id) {
        try {
            const res = await fetch(`/api/customer/navbar_cart/${user_id}`)
            const json = await res.json()
            if (!res.ok) throw new Error(json?.error || 'Failed to fetch cart count')
            setCartCount(json.data || 0)
        } catch (error) {
            console.error('Error fetchCartCount:', error)
        }
    }

    return (
        <CartContext.Provider
            value={{
                userId,
                setUserId,
                cartCount,
                setCartCount,
                fetchCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}