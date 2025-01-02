'use client'
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children, initialCartCount = 0, initialUserId = null }) {
    const [cartCount, setCartCount] = useState(initialCartCount)
    const [userId, setUserId] = useState(initialUserId)

    async function fetchCartCount(uid) {
        try {
            const res = await fetch(`/api/customer/navbar_cart/${uid}`)
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