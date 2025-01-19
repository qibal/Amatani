import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Product from '@/app/(customer)/products/page';
import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn((url) => {
    if (url.includes('/api/customer/products')) {
        return Promise.resolve({
            json: () => Promise.resolve([
                {
                    product_id: '1',
                    products_name: 'Test Product 1',
                    categories_name: 'Category 1',
                    price_type: 'fixed',
                    fixed_price: 100,
                    wholesale_prices: [],
                    images: ['image1.png'],
                },
                {
                    product_id: '2',
                    products_name: 'Test Product 2',
                    categories_name: 'Category 2',
                    price_type: 'wholesale',
                    fixed_price: null,
                    wholesale_prices: [
                        { min_quantity: 1, max_quantity: 10, price: 90 },
                        { min_quantity: 11, max_quantity: 20, price: 80 },
                    ],
                    images: ['image2.png'],
                },
            ]),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
}));

describe('Product', () => {
    beforeEach(() => {
        fetch.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    it('should render the Product page and display products', async () => {
        const { asFragment } = render(<Product />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    }, 10000);

    it('should handle search functionality', async () => {
        const searchParams = new URLSearchParams();
        searchParams.set('categories', 'Test Category');
        searchParams.set('products', 'Test Product');
        searchParams.set('all_product', 'All Products');

        useSearchParams.mockReturnValue(searchParams);

        render(<Product />);

        fireEvent.change(screen.getByPlaceholderText(/Search.../i), { target: { value: 'Test Product 1' } });
        fireEvent.submit(screen.getByRole('button', { name: /Cari/i }));

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/Test Product 2/i)).not.toBeInTheDocument();
        });
    }, 10000);

    it('should handle sorting functionality', async () => {
        render(<Product />);

        fireEvent.click(screen.getByText(/Sort by/i));
        fireEvent.click(screen.getByText(/A-Z/i));

        await waitFor(() => {
            const products = screen.getAllByText(/Test Product/i);
            expect(products[0]).toHaveTextContent('Test Product 1');
            expect(products[1]).toHaveTextContent('Test Product 2');
        });

        fireEvent.click(screen.getByText(/Sort by/i));
        fireEvent.click(screen.getByText(/Z-A/i));

        await waitFor(() => {
            const products = screen.getAllByText(/Test Product/i);
            expect(products[0]).toHaveTextContent('Test Product 2');
            expect(products[1]).toHaveTextContent('Test Product 1');
        });
    }, 10000);

    it('should handle filter functionality', async () => {
        render(<Product />);

        fireEvent.click(screen.getByText(/Filter/i));
        fireEvent.click(screen.getByText(/Category 1/i));

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/Test Product 2/i)).not.toBeInTheDocument();
        });
    }, 10000);

    it('should handle pagination functionality', async () => {
        render(<Product />);

        fireEvent.click(screen.getByText(/Next/i));

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
        });
    }, 10000);

    it('should handle API errors gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to fetch products' }),
        }));

        render(<Product />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch products/i)).toBeInTheDocument();
        });
    }, 10000);

    it('should handle invalid input gracefully', async () => {
        render(<Product />);

        fireEvent.change(screen.getByPlaceholderText(/Search.../i), { target: { value: '' } });
        fireEvent.submit(screen.getByRole('button', { name: /Cari/i }));

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
        });
    }, 10000);

    it('should handle edge cases gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                {
                    product_id: '3',
                    products_name: 'Edge Case Product',
                    categories_name: 'Category 3',
                    price_type: 'fixed',
                    fixed_price: 0,
                    wholesale_prices: [],
                    images: ['image3.png'],
                },
            ]),
        }));

        render(<Product />);

        await waitFor(() => {
            expect(screen.getByText(/Edge Case Product/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Rp 0/i)).toBeInTheDocument();
    }, 10000);
});
