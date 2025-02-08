import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductDetailComponent from '@/components/public/customers/product/product_detail/ProductsDetail';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { useCart } from '@/components/public/customers/Navbar/CartContext';

// Mock fetch
global.fetch = jest.fn((url) => {
    if (url.includes('/api/customer/products/products_detail')) {
        return Promise.resolve({
            json: () => Promise.resolve([
                {
                    product_id: '1',
                    products_name: 'Test Product',
                    products_description: 'Test Description',
                    stock: 100,
                    categories_name: 'Category 1',
                    price_type: 'fixed',
                    fixed_price: 100,
                    wholesale_prices: [],
                    images: ['image1.png'],
                },
            ]),
        });
    }
    if (url.includes('/api/customer/products/products_detail/add_to_cart')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Product added to cart successfully' }),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
});

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/components/customer/Navbar/CartContext', () => ({
    useCart: jest.fn(),
}));

describe('ProductDetailComponent', () => {
    beforeEach(() => {
        fetch.mockClear();
        useRouter.mockReturnValue({ push: jest.fn() });
        useCart.mockReturnValue({ userId: 'test-user-id', setUserId: jest.fn(), fetchCartCount: jest.fn() });
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    it('should render the ProductDetailComponent and display product details', async () => {
        const { asFragment } = render(<ProductDetailComponent product_id="1" />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
            expect(screen.getByText(/Category 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Rp 100/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle adding product to cart', async () => {
        render(<ProductDetailComponent product_id="1" />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Tambah Ke Keranjang/i));

        await waitFor(() => {
            expect(screen.getByText(/Product added to cart successfully/i)).toBeInTheDocument();
        });
    });

    it('should handle quantity change', async () => {
        render(<ProductDetailComponent product_id="1" />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '2' } });

        await waitFor(() => {
            expect(screen.getByLabelText(/quantity/i)).toHaveValue(2);
        });
    });

    it('should handle API errors gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to add product to cart' }),
        }));

        render(<ProductDetailComponent product_id="1" />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Tambah Ke Keranjang/i));

        await waitFor(() => {
            expect(screen.getByText(/Failed to add product to cart/i)).toBeInTheDocument();
        });
    });

    it('should handle invalid input gracefully', async () => {
        render(<ProductDetailComponent product_id="1" />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '-1' } });

        await waitFor(() => {
            expect(screen.getByLabelText(/quantity/i)).toHaveValue(1);
        });
    });

    it('should handle edge cases gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                {
                    product_id: '2',
                    products_name: 'Edge Case Product',
                    products_description: 'Edge Case Description',
                    stock: 0,
                    categories_name: 'Category 2',
                    price_type: 'wholesale',
                    fixed_price: null,
                    wholesale_prices: [
                        { min_quantity: 1, max_quantity: 5, price: 80 },
                        { min_quantity: 6, max_quantity: 10, price: 70 },
                    ],
                    images: ['image2.png'],
                },
            ]),
        }));

        render(<ProductDetailComponent product_id="2" />);

        await waitFor(() => {
            expect(screen.getByText(/Edge Case Product/i)).toBeInTheDocument();
            expect(screen.getByText(/Edge Case Description/i)).toBeInTheDocument();
            expect(screen.getByText(/Category 2/i)).toBeInTheDocument();
            expect(screen.getByText(/Rp 80 - Rp 70/i)).toBeInTheDocument();
        });
    });
});
