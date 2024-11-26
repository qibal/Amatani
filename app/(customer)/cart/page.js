"use client";

import { useReducer } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Minus, Plus } from "lucide-react";
import Link from "next/link";

// Initial state
const initialState = {
    products: [
        {
            id: 1,
            name: "Apel Merah",
            description: "Apple sangat enak saat di santap saat",
            price: 15000,
            quantity: 1,
            bgColor: "bg-pink-200",
            isSelected: true,
            maxQuantity: 100000,
            discount: 0.1,
            discountType: "percentage",
        },
        {
            id: 2,
            name: "Pisang Ambon",
            description: "Pisang sangat cocok untuk dessert",
            price: 10000,
            quantity: 2,
            bgColor: "bg-yellow-200",
            isSelected: true,
            maxQuantity: 5000000,
        },
        {
            id: 3,
            name: "Jeruk Manis",
            description: "Jeruk yang segar dan manis",
            price: 12000,
            quantity: 3,
            bgColor: "bg-orange-200",
            isSelected: false,
            maxQuantity: 3000000,
            discount: 2000,
            discountType: "nominal",
        },
    ],
    taxRate: 0.1,
};

// Reducer
function cartReducer(state, action) {
    switch (action.type) {
        case "UPDATE_QUANTITY": {
            const updatedProducts = [...state.products];
            const productIndex = updatedProducts.findIndex((product) => product.id === action.id);
            if (productIndex !== -1) {
                updatedProducts[productIndex].quantity = Math.min(
                    Math.max(1, action.quantity),
                    updatedProducts[productIndex].maxQuantity
                );
            }
            return { ...state, products: updatedProducts };
        }
        case "REMOVE_PRODUCT":
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.id),
            };
        case "TOGGLE_SELECTION":
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.id ? { ...product, isSelected: !product.isSelected } : product
                ),
            };
        default:
            return state;
    }
}

// ProductItem Component
function ProductItem({ product, dispatch }) {
    const handleInputBlur = (e) => {
        const value = parseInt(e.target.value, 10);
        const newQuantity = isNaN(value) ? 1 : Math.min(Math.max(1, value), product.maxQuantity);
        dispatch({ type: "UPDATE_QUANTITY", id: product.id, quantity: newQuantity });
    };

    return (
        <div className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm">
            <Checkbox
                className="mr-4"
                checked={product.isSelected}
                onCheckedChange={() => dispatch({ type: "TOGGLE_SELECTION", id: product.id })}
            />
            <div className="flex flex-1 items-center space-x-4">
                <div className={`w-16 h-16 ${product.bgColor} rounded-md`} />
                <div>
                    <p className="text-lg font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <p className="text-red-500 font-semibold">
                        Rp {product.price.toLocaleString()} / kg
                        {product.discount && (
                            <span className="ml-2 text-green-500">
                                ({product.discountType === "percentage" ? `Diskon ${product.discount * 100}%` : `Hemat Rp ${product.discount}`})
                            </span>
                        )}
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        dispatch({
                            type: "UPDATE_QUANTITY",
                            id: product.id,
                            quantity: product.quantity - 1,
                        })
                    }
                    disabled={product.quantity <= 1}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <Input
                    type="number"
                    value={product.quantity} // Menggunakan value langsung dari state
                    onChange={(e) => {
                        const newQuantity = Math.min(
                            Math.max(1, parseInt(e.target.value || "0", 10)),
                            product.maxQuantity
                        );
                        dispatch({
                            type: "UPDATE_QUANTITY",
                            id: product.id,
                            quantity: isNaN(newQuantity) ? 1 : newQuantity,
                        });
                    }}
                    className="w-20 text-center"
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        dispatch({
                            type: "UPDATE_QUANTITY",
                            id: product.id,
                            quantity: product.quantity + 1,
                        })
                    }
                    disabled={product.quantity >= product.maxQuantity}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="text-red-500"
                onClick={() => dispatch({ type: "REMOVE_PRODUCT", id: product.id })}
            >
                <Trash2 className="h-5 w-5" />
            </Button>
        </div>
    );
}

// OrderSummary Component
function OrderSummary({ selectedProducts, tax, total, taxRate }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan</h2>
            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                {selectedProducts.map((product) => {
                    const discountedPrice =
                        product.discount && product.discountType === "percentage"
                            ? product.price - product.price * product.discount
                            : product.discountType === "nominal"
                                ? product.price - product.discount
                                : product.price;
                    return (
                        <div key={product.id} className="flex justify-between">
                            <p>{product.name} (x{product.quantity})</p>
                            <p>
                                Rp {(discountedPrice * product.quantity).toLocaleString()}
                            </p>
                        </div>
                    );
                })}
                <div className="flex justify-between">
                    <p>Pajak ({(taxRate * 100).toFixed(0)}%)</p>
                    <p>Rp {tax.toLocaleString()}</p>
                </div>
                <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>Rp {total.toLocaleString()}</p>
                </div>
            </div>
            <Button className="mt-4 w-full bg-red-500 text-white hover:bg-red-600">Checkout</Button>
        </div>
    );
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

// Main CartPage Component
export default function CartPage() {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const selectedProducts = state.products.filter((product) => product.isSelected);
    const subtotal = selectedProducts.reduce((total, product) => {
        const discountedPrice =
            product.discount && product.discountType === "percentage"
                ? product.price - product.price * product.discount
                : product.discountType === "nominal"
                    ? product.price - product.discount
                    : product.price;
        return total + discountedPrice * product.quantity;
    }, 0);
    const tax = subtotal * state.taxRate;
    const total = subtotal + tax;

    if (state.products.length === 0) {
        return <EmptyCart />;
    }

    return (
        <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
                <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
                <div className="space-y-4">
                    {state.products.map((product) => (
                        <ProductItem key={product.id} product={product} dispatch={dispatch} />
                    ))}
                </div>
            </div>
            <OrderSummary selectedProducts={selectedProducts} tax={tax} total={total} taxRate={state.taxRate} />
        </main>
    );
}
