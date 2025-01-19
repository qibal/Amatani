import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddProductPage from '@/app/dashboard/products/add/page';
import '@testing-library/jest-dom';
import { SidebarProvider } from '@/components/ui/sidebar'; // P243a

// Mock fetch
global.fetch = jest.fn((url, options) => {
    if (url.endsWith('/api/dashboard/products/insert')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Product added successfully' }),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
});

describe('AddProductPage', () => {
    beforeEach(() => {
        fetch.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    it('should render the AddProductPage and submit the form', async () => {
        const { asFragment } = render(
            <SidebarProvider>
                <AddProductPage />
            </SidebarProvider>
        );

        fireEvent.change(screen.getByLabelText(/Nama Produk/i), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByLabelText(/Kategori Produk/i), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Deskripsi Produk/i), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText(/Harga Tetap/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/Product Images/i), { target: { files: [new File(['image'], 'image.png', { type: 'image/png' })] } });

        fireEvent.submit(screen.getByRole('button', { name: /Tambah/i }));

        await waitFor(() => {
            expect(screen.getByText(/berhasil di upload/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should display validation errors when form is submitted with empty fields', async () => {
        render(
            <SidebarProvider>
                <AddProductPage />
            </SidebarProvider>
        );

        fireEvent.submit(screen.getByRole('button', { name: /Tambah/i }));

        await waitFor(() => {
            expect(screen.getByText('Tidak boleh kosong')).toBeInTheDocument();
            expect(screen.getByText('Kategori produk harus dipilih')).toBeInTheDocument();
            expect(screen.getByText('Harus lebih dari 0')).toBeInTheDocument();
            expect(screen.getByText('Setidaknya ada 1 gambar produk')).toBeInTheDocument();
        });
    });

    it('should handle API errors gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to add product' }),
        }));

        render(
            <SidebarProvider>
                <AddProductPage />
            </SidebarProvider>
        );

        fireEvent.change(screen.getByLabelText(/Nama Produk/i), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByLabelText(/Kategori Produk/i), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Deskripsi Produk/i), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText(/Harga Tetap/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/Product Images/i), { target: { files: [new File(['image'], 'image.png', { type: 'image/png' })] } });

        fireEvent.submit(screen.getByRole('button', { name: /Tambah/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to add product/i)).toBeInTheDocument();
        });
    });

    it('should handle invalid input gracefully', async () => {
        render(
            <SidebarProvider>
                <AddProductPage />
            </SidebarProvider>
        );

        fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '-1' } });

        await waitFor(() => {
            expect(screen.getByLabelText(/Stock/i)).toHaveValue(0);
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

        render(
            <SidebarProvider>
                <AddProductPage product_id="2" />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Edge Case Product/i)).toBeInTheDocument();
            expect(screen.getByText(/Edge Case Description/i)).toBeInTheDocument();
            expect(screen.getByText(/Category 2/i)).toBeInTheDocument();
            expect(screen.getByText(/Rp 80 - Rp 70/i)).toBeInTheDocument();
        });
    });
});
