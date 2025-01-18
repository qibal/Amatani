import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartPage from '@/app/(customer)/cart/page';
import '@testing-library/jest-dom';
import { CartProvider } from '@/components/customer/Navbar/CartContext';

// Mock fetch
global.fetch = jest.fn((url, options) => {
    if (url.endsWith('/api/customer/cart/123')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    items: [
                        {
                            cart_items_id: '1',
                            products_name: 'Test Product 1',
                            price_type: 'fixed',
                            fixed_price: 100,
                            stock: 10,
                            quantity: 1,
                            product_images: [{ image_path: 'path/to/image1.png' }],
                            isSelected: true,
                        },
                        {
                            cart_items_id: '2',
                            products_name: 'Test Product 2',
                            price_type: 'wholesale',
                            wholesale_prices: [
                                { min_quantity: 1, max_quantity: 5, price: 80 },
                                { min_quantity: 6, max_quantity: 10, price: 70 },
                            ],
                            stock: 10,
                            quantity: 1,
                            product_images: [{ image_path: 'path/to/image2.png' }],
                            isSelected: true,
                        },
                    ],
                },
            }),
        });
    }
    if (url.endsWith('/api/customer/cart/quantity_change')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Quantity updated successfully' }),
        });
    }
    if (url.endsWith('/api/customer/cart/123') && options.method === 'DELETE') {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Item removed successfully' }),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
});

describe('CartPage', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should render the CartPage and display cart items', async () => {
        render(
            <CartProvider initialUserId="123">
                <CartPage />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
        });
    });

    it('should update quantity when increment button is clicked', async () => {
        render(
            <CartProvider initialUserId="123">
                <CartPage />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('+')[0]);

        await waitFor(() => {
            expect(screen.getByDisplayValue('2')).toBeInTheDocument();
        });
    });

    it('should update quantity when decrement button is clicked', async () => {
        render(
            <CartProvider initialUserId="123">
                <CartPage />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('-')[0]);

        await waitFor(() => {
            expect(screen.getByDisplayValue('1')).toBeInTheDocument();
        });
    });

    it('should remove item when delete button is clicked', async () => {
        render(
            <CartProvider initialUserId="123">
                <CartPage />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('×')[0]);

        await waitFor(() => {
            expect(screen.queryByText(/Test Product 1/i)).not.toBeInTheDocument();
        });
    });

    it('should calculate total price correctly', async () => {
        render(
            <CartProvider initialUserId="123">
                <CartPage />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Total/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Rp 180/i)).toBeInTheDocument();
    });
});
