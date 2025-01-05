'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { useCart } from '@/components/customer/Navbar/CartContext'

export default function CartPage() {
    const [cartData, setCartData] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const { userId } = useCart()

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await fetch(`/api/customer/cart/${userId}`)
                const json = await res.json()
                console.log("🚀 ~ fetchCart ~ json: berasil api", json)
                setCartData(json)
                setCartItems(json.data.items.map(item => ({ ...item, isSelected: true })))
            } catch (error) {
                console.error('Fetch cart error:', error)
            }
        }
        fetchCart()
    }, [userId])

    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.cart_items_id === id ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) } : item
        ))
    }

    const toggleSelection = (id) => {
        setCartItems(cartItems.map(item =>
            item.cart_items_id === id ? { ...item, isSelected: !item.isSelected } : item
        ))
    }

    const calculateItemPrice = (item) => {
        if (item.price_type === 'wholesale' && item.wholesale_prices) {
            const applicablePrice = item.wholesale_prices
                .filter(wp => item.quantity >= wp.min_quantity)
                .sort((a, b) => b.min_quantity - a.min_quantity)[0];
            return applicablePrice ? applicablePrice.price : item.fixed_price;
        }
        return item.fixed_price;
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (item.isSelected) {
                const price = calculateItemPrice(item);
                return total + price * item.quantity;
            }
            return total;
        }, 0);
    }

    const calculateSavings = () => {
        return cartItems.reduce((savings, item) => {
            if (item.isSelected && item.price_type === 'wholesale' && item.wholesale_prices) {
                const regularPrice = item.fixed_price * item.quantity;
                const wholesalePrice = calculateItemPrice(item) * item.quantity;
                const itemSavings = regularPrice - wholesalePrice;
                if (itemSavings > 0) {
                    savings.push({
                        name: item.products_name,
                        quantity: item.quantity,
                        regularPrice,
                        wholesalePrice,
                        savings: itemSavings
                    });
                }
            }
            return savings;
        }, []);
    }

    if (!cartData || !cartData.data || cartData.data.items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3">
                    {cartItems.map(item => (
                        <Card key={item.cart_items_id} className="mb-4">
                            <CardContent className="flex items-center p-4">
                                <Checkbox
                                    checked={item.isSelected}
                                    onCheckedChange={() => toggleSelection(item.cart_items_id)}
                                    className="mr-4"
                                />
                                <Image
                                    src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${item.product_images[0].image_path}`}
                                    alt={item.products_name}
                                    width={100}
                                    height={100}
                                    className="rounded-md mr-4"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-lg font-semibold">{item.products_name}</h2>
                                    <p className="text-gray-600">
                                        Price Type: {item.price_type.charAt(0).toUpperCase() + item.price_type.slice(1)}
                                    </p>
                                    <p className="text-gray-600">
                                        Price: Rp {calculateItemPrice(item).toLocaleString()}
                                        {item.price_type === 'wholesale' && ` (${item.quantity} items)`}
                                    </p>
                                    <p className="text-gray-600">
                                        Stock: {item.stock}
                                    </p>
                                    {item.price_type === 'wholesale' && (
                                        <div className="text-sm text-gray-500 mt-1">
                                            Wholesale Pricing:
                                            {item.wholesale_prices.map((wp, index) => (
                                                <span key={index} className="ml-2">
                                                    {wp.min_quantity}+: Rp {wp.price.toLocaleString()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex items-center mt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.cart_items_id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value, 10);
                                                if (!isNaN(newQuantity)) {
                                                    updateQuantity(item.cart_items_id, newQuantity);
                                                }
                                            }}
                                            className="w-16 mx-2 text-center"
                                        />
                                        {item.quantity > item.stock && (
                                            <p className="text-red-500 mt-2">Exceeded stock limit!</p>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.cart_items_id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    {item.quantity > item.stock && (
                                        <p className="text-red-500 mt-2">Exceeded stock limit!</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="w-full md:w-1/3">
                    <Card className="sticky top-0">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {cartItems.filter(item => item.isSelected).map(item => (
                                <div key={item.cart_items_id} className="flex justify-between mb-2">
                                    <span>{item.products_name} (x{item.quantity})</span>
                                    <span>Rp {(calculateItemPrice(item) * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <Separator className="my-4" />
                            {calculateSavings().length > 0 && (
                                <>
                                    <div className="text-sm font-semibold mb-2">Wholesale Savings:</div>
                                    {calculateSavings().map((saving, index) => (
                                        <div key={index} className="text-sm mb-2 flex justify-between items-center">
                                            <span>{saving.name} (x{saving.quantity})</span>
                                            <span>
                                                <span style={{ textDecoration: 'line-through' }}>
                                                    (Rp {saving.regularPrice.toLocaleString()})
                                                </span>
                                                {' '}
                                                Rp {saving.wholesalePrice.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                    <Separator className="my-4" />
                                </>
                            )}
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>Rp {calculateTotal().toLocaleString()}</span>
                            </div>
                            {calculateSavings().length > 0 && (
                                <div className="flex justify-between font-bold text-green-600 mt-2">
                                    <span>Total Savings</span>
                                    <span>Rp {calculateSavings().reduce((total, saving) => total + saving.savings, 0).toLocaleString()}</span>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-rose-600 hover:bg-rose-700 rounded-full">Checkout</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// EmptyCart Component
function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Keranjang Belanja Kosong</h1>
            <p className="text-gray-600 mb-8">Tambah produk ke keranjang untuk mulai belanja!</p>
            <Link href="/">
                <Button className="bg-red-500 text-white hover:bg-red-600">Belanja Sekarang</Button>
            </Link>
        </div>
    );
}