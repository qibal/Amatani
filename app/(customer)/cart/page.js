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
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

export default function CartPage() {
    const [cartData, setCartData] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const { userId } = useCart()
    const [debounceTimeout, setDebounceTimeout] = useState(null)

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await fetch(`/api/customer/cart/${userId}`)
                const json = await res.json()
                console.log("🚀 ~ fetchCart ~ json: berasil api", json)
                setCartData(json)
                setCartItems(json.data.items.map(item => ({ ...item, isSelected: false })))
            } catch (error) {
                console.error('Fetch cart error:', error)
            }
        }
        fetchCart()
    }, [userId])

    const removeItem = async (cart_items_id) => {
        try {
            const response = await fetch(`/api/customer/cart/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart_items_id }),
            });

            if (response.ok) {
                // Jika berhasil dihapus, update state lokal
                setCartItems(cartItems.filter(item => item.cart_items_id !== cart_items_id));
                toast.success("Item removed successfully");
            } else {
                console.error('Failed to delete item');
                toast.error("Failed to remove item");
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.cart_items_id === id ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) } : item
        ))

        // Clear previous timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout)
        }

        // Set new timeout
        setDebounceTimeout(setTimeout(() => {
            // Update quantity in the database
            updateQuantityInDatabase(id, newQuantity)
        }, 500))
    }

    const updateQuantityInDatabase = async (id, newQuantity) => {
        try {
            const response = await fetch(`/api/customer/cart/quantity_change`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart_items_id: id, quantity: newQuantity, user_id: userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity')
            }
        } catch (error) {
            console.error('Error updating quantity:', error)
            toast.error("Failed to update quantity")
        }
    }

    const handleQuantityChange = (id, value) => {
        setCartItems(cartItems.map(item =>
            item.cart_items_id === id ? { ...item, quantity: value === '' ? '' : Math.max(1, Math.min(parseInt(value, 10), item.stock)) } : item
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
                .filter(wp => item.quantity >= wp.min_quantity && item.quantity <= wp.max_quantity)
                .sort((a, b) => b.min_quantity - a.min_quantity)[0];
            return applicablePrice ? applicablePrice.price : 0;
        }
        return item.fixed_price;
    }

    const calculateRegularPrice = (item) => {
        if (item.price_type === 'wholesale' && item.wholesale_prices) {
            const highestPrice = item.wholesale_prices
                .sort((a, b) => b.price - a.price)[0];
            return highestPrice ? highestPrice.price : 0;
        }
        return item.fixed_price;
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (item.isSelected) {
                const price = calculateItemPrice(item);
                return total + (price ? price * item.quantity : 0);
            }
            return total;
        }, 0);
    }

    const calculateSavings = () => {
        return cartItems.reduce((savings, item) => {
            if (item.isSelected && item.price_type === 'wholesale' && item.wholesale_prices) {
                const regularPrice = calculateRegularPrice(item) * item.quantity;
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
    const isCheckoutDisabled = cartItems.every(item => !item.isSelected);

    if (!cartData || !cartData.data || cartData.data.items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="container mx-auto pt-6 px-16">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3">
                    {cartItems.map((item) => (
                        <Card key={item.cart_items_id} className="mb-4">
                            <CardContent className="flex items-center justify-between p-4">
                                {/* Kolom Kiri (Produk) */}
                                <div className="flex items-center">
                                    {item.product_id === null ? (
                                        <>
                                            {/* <Checkbox
                                                checked={false}
                                                disabled
                                                className="mr-4"
                                            /> */}
                                            <div
                                                className="w-24 h-24 bg-gray-400 rounded-md mr-4 ml-8"
                                                alt="Produk sudah di hapus"
                                            />
                                            <div className="flex-grow">
                                                <h2 className="text-lg font-semibold text-rose-600">
                                                    Produk sudah di hapus
                                                </h2>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {item.stock !== 0 && item.stock !== null ? (
                                                <Checkbox
                                                    checked={item.isSelected}
                                                    onCheckedChange={() => toggleSelection(item.cart_items_id)}
                                                    className="mr-4"
                                                />
                                            ) : (
                                                <Checkbox
                                                    checked={false}
                                                    disabled
                                                    className="mr-4"
                                                />
                                            )}
                                            <Image
                                                src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${item.product_images[0].image_path}`}
                                                alt={item.products_name}
                                                width={100}
                                                height={100}
                                                className={`rounded-md mr-4 ${item.stock === 0 || item.stock === null ? 'grayscale' : ''}`}
                                            />
                                            <div className="flex-grow">
                                                <h2 className={`text-lg font-semibold ${item.stock === 0 || item.stock === null ? 'text-rose-600' : ''}`}>
                                                    {item.stock === 0 || item.stock === null ? 'Produk sudah habis' : item.products_name}
                                                </h2>
                                                <p className="text-gray-600">
                                                    Price Type: {item.price_type.charAt(0).toUpperCase() + item.price_type.slice(1)}
                                                </p>
                                                {item.price_type === 'fixed' ? (
                                                    <p className="text-gray-600">
                                                        Price: Rp {item.fixed_price ? item.fixed_price.toLocaleString() : '0'}
                                                    </p>
                                                ) : (
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        Wholesale Pricing:
                                                        {item.wholesale_prices.map((wp, index) => (
                                                            <span key={index} className="ml-2">
                                                                {wp.min_quantity} - {wp.max_quantity}: Rp {wp.price ? wp.price.toLocaleString() : '0'}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-gray-600">Stock: {item.stock}</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Kolom Kanan (Kontrol Kuantitas dan Hapus) */}
                                <div className="flex items-center space-x-2 ml-4">
                                    {item.product_id !== null && item.stock !== 0 && item.stock !== null && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.cart_items_id, item.quantity - 1)}
                                            >
                                                -
                                            </Button>
                                            <Input
                                                value={item.quantity === '' ? '' : item.quantity}
                                                onChange={(e) => handleQuantityChange(item.cart_items_id, e.target.value)}
                                                onBlur={(e) => {
                                                    if (e.target.value === '') {
                                                        updateQuantity(item.cart_items_id, 1);
                                                    }
                                                }}
                                                className="w-16 text-center"
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.cart_items_id, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </>
                                    )}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="icon" className="ml-2">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently remove the item from your cart.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => removeItem(item.cart_items_id)}>
                                                    Remove
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Kolom Kanan (Ringkasan dan Checkout) */}
                <div className="w-full md:w-1/3">
                    <Card className="sticky top-0">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {cartItems.filter(item => item.isSelected).map(item => {
                                const price = calculateItemPrice(item);
                                const totalPrice = price ? price * item.quantity : 0;
                                const regularPrice = calculateRegularPrice(item) * item.quantity;
                                const savings = regularPrice - totalPrice;

                                return (
                                    <div key={item.cart_items_id} className="flex justify-between mb-2">
                                        <span>{item.products_name} (x{item.quantity})</span>
                                        <span>
                                            {savings > 0 ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through' }}>
                                                        Rp {regularPrice.toLocaleString()}
                                                    </span>
                                                    {' '}
                                                    Rp {totalPrice.toLocaleString()}
                                                </>
                                            ) : (
                                                <>Rp {totalPrice.toLocaleString()}</>
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                            <Separator className="my-4" />
                            {/* {calculateSavings().length > 0 && (
                                <>
                                    <div className="text-sm font-semibold mb-2">Wholesale Savings:</div>
                                    {calculateSavings().map((saving, index) => (
                                        <div key={index} className="text-sm mb-2 flex justify-between items-center">
                                            <span>{saving.name} (x{saving.quantity})</span>
                                            <span>
                                                <span style={{ textDecoration: 'line-through' }}>
                                                    (Rp {saving.regularPrice ? saving.regularPrice.toLocaleString() : ''})
                                                </span>
                                                {' '}
                                                Rp {saving.wholesalePrice ? saving.wholesalePrice.toLocaleString() : ''}
                                            </span>
                                        </div>
                                    ))}
                                    <Separator className="my-4" />
                                </>
                            )}  */}
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
                            <Button
                                className={`w-full rounded-full ${isCheckoutDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}
                                disabled={isCheckoutDisabled}
                            >
                                Checkout
                            </Button>
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