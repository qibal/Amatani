import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddProductPage from '@/app/dashboard/products/add/page';
import '@testing-library/jest-dom';

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
    });

    it('should render the AddProductPage and submit the form', async () => {
        const { asFragment } = render(<AddProductPage />);

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
        render(<AddProductPage />);

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

        render(<AddProductPage />);

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
        render(<AddProductPage />);

        fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '-1' } });

        await waitFor(() => {
            expect(screen.getByLabelText(/Stock/i)).toHaveValue(0);
        });
    });
});
