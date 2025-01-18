import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartPage from '@/app/(customer)/cart/page';
import '@testing-library/jest-dom';
import { useCart } from '@/components/customer/Navbar/CartContext';
import { toast } from 'sonner';

// Mock necessary API calls and user interactions
jest.mock('@/components/customer/Navbar/CartContext', () => ({
    useCart: jest.fn(),
}));

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

global.fetch = jest.fn();

describe('CartPage', () => {
    beforeEach(() => {
        useCart.mockReturnValue({ userId: 'test-user-id' });
        fetch.mockClear();
        toast.success.mockClear();
        toast.error.mockClear();
    });

    it('should render the CartPage and fetch cart data', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    items: [
                        {
                            cart_items_id: '1',
                            products_name: 'Test Product',
                            price_type: 'fixed',
                            fixed_price: 100,
                            quantity: 1,
                            stock: 10,
                            product_images: [{ image_path: 'path/to/image' }],
                        },
                    ],
                },
            }),
        });

        render(<CartPage />);

        await waitFor(() => {
            expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        });
    });

    it('should handle quantity change and update the database', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    items: [
                        {
                            cart_items_id: '1',
                            products_name: 'Test Product',
                            price_type: 'fixed',
                            fixed_price: 100,
                            quantity: 1,
                            stock: 10,
                            product_images: [{ image_path: 'path/to/image' }],
                        },
                    ],
                },
            }),
        });

        fetch.mockResolvedValueOnce({
            ok: true,
        });

        render(<CartPage />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '2' } });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/customer/cart/quantity_change', expect.any(Object));
        });
    });

    it('should handle item removal', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    items: [
                        {
                            cart_items_id: '1',
                            products_name: 'Test Product',
                            price_type: 'fixed',
                            fixed_price: 100,
                            quantity: 1,
                            stock: 10,
                            product_images: [{ image_path: 'path/to/image' }],
                        },
                    ],
                },
            }),
        });

        fetch.mockResolvedValueOnce({
            ok: true,
        });

        render(<CartPage />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /Remove/i }));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/customer/cart/test-user-id', expect.any(Object));
            expect(toast.success).toHaveBeenCalledWith('Item removed successfully');
        });
    });

    it('should handle checkout button state', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    items: [
                        {
                            cart_items_id: '1',
                            products_name: 'Test Product',
                            price_type: 'fixed',
                            fixed_price: 100,
                            quantity: 1,
                            stock: 10,
                            product_images: [{ image_path: 'path/to/image' }],
                        },
                    ],
                },
            }),
        });

        render(<CartPage />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('checkbox'));

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Checkout/i })).toBeDisabled();
        });
    });
});
