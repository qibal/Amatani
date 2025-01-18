import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Product from '@/app/(customer)/products/page';
import '@testing-library/jest-dom';

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
                    images: ['image1.png']
                },
                {
                    product_id: '2',
                    products_name: 'Test Product 2',
                    categories_name: 'Category 2',
                    price_type: 'wholesale',
                    fixed_price: null,
                    wholesale_prices: [
                        { min_quantity: 1, max_quantity: 10, price: 90 },
                        { min_quantity: 11, max_quantity: 20, price: 80 }
                    ],
                    images: ['image2.png']
                }
            ]),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
});

describe('Product', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should render the Product component and display products', async () => {
        render(<Product />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
        });
    });

    it('should handle search functionality', async () => {
        render(<Product />);

        fireEvent.change(screen.getByPlaceholderText(/Cari produk/i), { target: { value: 'Test Product 1' } });
        fireEvent.submit(screen.getByText(/Cari/i));

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
        });
    });

    it('should handle filter and sort functionality', async () => {
        render(<Product />);

        fireEvent.click(screen.getByText(/Filter/i));
        fireEvent.click(screen.getByText(/Sort By/i));

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
        });
    });

    it('should handle edge cases and error handling', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('API Error')));

        render(<Product />);

        await waitFor(() => {
            expect(screen.getByText(/Tidak ada produk!/i)).toBeInTheDocument();
        });
    });
});
