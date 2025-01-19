import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductPage from '@/app/dashboard/products/page';
import '@testing-library/jest-dom';
import { supabase } from '@/lib/supabase/client';

jest.mock('@/lib/supabase/client', () => ({
    supabase: {
        storage: {
            from: jest.fn(() => ({
                remove: jest.fn(() => Promise.resolve({ error: null })),
            })),
        },
    },
}));

global.fetch = jest.fn((url, options) => {
    if (url.endsWith('/api/dashboard/products')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                {
                    product_id: '1',
                    products_name: 'Test Product 1',
                    categories_name: 'Category 1',
                    price_type: 'fixed',
                    fixed_price: 100,
                    stock: 10,
                    images: ['image1.png'],
                },
                {
                    product_id: '2',
                    products_name: 'Test Product 2',
                    categories_name: 'Category 2',
                    price_type: 'wholesale',
                    wholesale_prices: [
                        { min_quantity: 1, max_quantity: 10, price: 90 },
                        { min_quantity: 11, max_quantity: 20, price: 80 },
                    ],
                    stock: 20,
                    images: ['image2.png'],
                },
            ]),
        });
    }
    if (url.includes('/api/dashboard/products/delete/')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
});

describe('ProductPage', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should render the ProductPage and display products', async () => {
        const { asFragment } = render(<ProductPage />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle product deletion', async () => {
        render(<ProductPage />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText(/Delete/i)[0]);

        await waitFor(() => {
            expect(screen.queryByText(/Test Product 1/i)).not.toBeInTheDocument();
        });
    });

    it('should handle API errors gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to fetch products' }),
        }));

        render(<ProductPage />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch products/i)).toBeInTheDocument();
        });
    });

    it('should display validation errors when form is submitted with empty fields', async () => {
        render(<ProductPage />);

        fireEvent.submit(screen.getByRole('button', { name: /Add Product/i }));

        await waitFor(() => {
            expect(screen.getByText('Tidak boleh kosong')).toBeInTheDocument();
            expect(screen.getByText('Kategori produk harus dipilih')).toBeInTheDocument();
            expect(screen.getByText('Harus lebih dari 0')).toBeInTheDocument();
            expect(screen.getByText('Setidaknya ada 1 gambar produk')).toBeInTheDocument();
        });
    });

    it('should handle file removal', async () => {
        const handleChange = jest.fn();
        const file = new File(['image'], 'image.png', { type: 'image/png' });
        const fileWithPreview = Object.assign(file, { preview: 'data:image/png;base64,example' });

        render(<ProductPage onChange={handleChange} value={[fileWithPreview]} error={null} mode="add" />);

        fireEvent.click(screen.getByText(/×/i));

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledWith([]);
        });
    });

    it('should handle file removal from storage', async () => {
        const handleChange = jest.fn();
        const fileUrl = 'https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/product_images/image.png';

        render(<ProductPage onChange={handleChange} value={[fileUrl]} error={null} mode="edit" />);

        fireEvent.click(screen.getByText(/×/i));

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledWith([]);
            expect(supabase.storage.from().remove).toHaveBeenCalledWith(['image.png']);
        });
    });

    it('should handle invalid input gracefully', async () => {
        render(<ProductPage />);

        fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '-1' } });

        await waitFor(() => {
            expect(screen.getByLabelText(/Stock/i)).toHaveValue(0);
        });
    });
});
