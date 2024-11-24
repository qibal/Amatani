"use client";

import { useState } from "react";

const ProductPriceVariantForm = () => {
    // Dummy data for products
    const productOptions = [
        { product_id: 1, name: "Carrot" },
        { product_id: 2, name: "Potato" },
        { product_id: 3, name: "Spinach" },
    ];

    const [variants, setVariants] = useState([{ minQuantity: '', maxQuantity: '', price: '' }]);

    const handleInputChange = (index, event) => {
        const values = [...variants];
        values[index][event.target.name] = event.target.value;
        setVariants(values);
    };

    const handleAddVariant = () => {
        if (variants.length < 2) { // Limit to 2 forms
            setVariants([...variants, { minQuantity: '', maxQuantity: '', price: '' }]);
        } else {
            alert("You can only add up to 2 variants.");
        }
    };

    const handleRemoveVariant = (index) => {
        if (variants.length > 1) { // Keep at least one form visible
            const values = [...variants];
            values.splice(index, 1);
            setVariants(values);
        } else {
            alert("At least one variant form is required.");
        }
    };

    return (
        <div className="p-4 space-y-6">
            <div>
                <label htmlFor="product" className="block text-sm font-medium">Product</label>
                <select id="product" name="productId" className="shadcn-input mt-1">
                    {productOptions.map((product) => (
                        <option key={product.product_id} value={product.product_id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>

            {variants.map((variant, index) => (
                <div key={index} className="space-y-2 border-b border-gray-200 pb-4 mb-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor={`minQuantity-${index}`} className="block text-sm font-medium">Min Quantity</label>
                            <input
                                type="number"
                                name="minQuantity"
                                value={variant.minQuantity}
                                onChange={(e) => handleInputChange(index, e)}
                                className="shadcn-input mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor={`maxQuantity-${index}`} className="block text-sm font-medium">Max Quantity</label>
                            <input
                                type="number"
                                name="maxQuantity"
                                value={variant.maxQuantity}
                                onChange={(e) => handleInputChange(index, e)}
                                className="shadcn-input mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor={`price-${index}`} className="block text-sm font-medium">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={variant.price}
                                onChange={(e) => handleInputChange(index, e)}
                                className="shadcn-input mt-1"
                            />
                        </div>
                    </div>
                    {variants.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleRemoveVariant(index)}
                            className="text-red-500 hover:underline mt-2"
                        >
                            Remove Variant
                        </button>
                    )}
                </div>
            ))}

            {variants.length < 2 && (
                <button
                    type="button"
                    onClick={handleAddVariant}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Variant
                </button>
            )}
        </div>
    );
};

export default ProductPriceVariantForm;
