import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomerPage from '@/app/(customer)/page';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn((url) => {
    if (url.endsWith('/api/customer/home/home_buah')) {
        return Promise.resolve({
            json: () => Promise.resolve([
                {
                    categories_id: '1',
                    categories_name: 'Buah - Buahan',
                    products: [
                        {
                            product_id: '1',
                            products_name: 'Apel',
                            images: ['path/to/apel.jpg'],
                            wholesale_prices: [{ price: 10000 }]
                        },
                        {
                            product_id: '2',
                            products_name: 'Jeruk',
                            images: ['path/to/jeruk.jpg'],
                            wholesale_prices: [{ price: 15000 }]
                        }
                    ]
                }
            ]),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
});

describe('CustomerPage', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should render the CustomerPage and display products', async () => {
        render(<CustomerPage />);

        await waitFor(() => {
            expect(screen.getByText(/Sumber Segar/i)).toBeInTheDocument();
            expect(screen.getByText(/Buah - Buahan/i)).toBeInTheDocument();
            expect(screen.getByText(/Apel/i)).toBeInTheDocument();
            expect(screen.getByText(/Jeruk/i)).toBeInTheDocument();
        });
    });

    it('should handle API errors gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));

        render(<CustomerPage />);

        await waitFor(() => {
            expect(screen.getByText(/Sumber Segar/i)).toBeInTheDocument();
            expect(screen.queryByText(/Buah - Buahan/i)).not.toBeInTheDocument();
        });
    });
});
