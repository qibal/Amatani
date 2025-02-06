import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomerPage from '@/app/(public)/page';
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
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    it('should render the CustomerPage and display products', async () => {
        const { asFragment } = render(<CustomerPage />);

        await waitFor(() => {
            expect(screen.getByText(/Sumber Segar/i)).toBeInTheDocument();
            expect(screen.getByText(/Buah - Buahan/i)).toBeInTheDocument();
            expect(screen.getByText(/Apel/i)).toBeInTheDocument();
            expect(screen.getByText(/Jeruk/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle API errors gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));

        render(<CustomerPage />);

        await waitFor(() => {
            expect(screen.getByText(/Sumber Segar/i)).toBeInTheDocument();
            expect(screen.queryByText(/Buah - Buahan/i)).not.toBeInTheDocument();
        });
    });

    it('should handle invalid input gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Invalid input' }),
        }));

        render(<CustomerPage />);

        await waitFor(() => {
            expect(screen.getByText(/Sumber Segar/i)).toBeInTheDocument();
            expect(screen.queryByText(/Buah - Buahan/i)).not.toBeInTheDocument();
        });
    });

    it('should handle edge cases gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                {
                    categories_id: '2',
                    categories_name: 'Edge Case Category',
                    products: [
                        {
                            product_id: '3',
                            products_name: 'Edge Case Product',
                            images: ['path/to/edge_case.jpg'],
                            wholesale_prices: [{ price: 0 }]
                        }
                    ]
                }
            ]),
        }));

        render(<CustomerPage />);

        await waitFor(() => {
            expect(screen.getByText(/Edge Case Category/i)).toBeInTheDocument();
            expect(screen.getByText(/Edge Case Product/i)).toBeInTheDocument();
        });
    });
});
