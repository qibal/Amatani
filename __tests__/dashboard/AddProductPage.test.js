import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddProductPage from '@/app/dashboard/products/add/page';
import '@testing-library/jest-dom';

describe('AddProductPage', () => {
    it('should render the AddProductPage and submit the form', async () => {
        render(<AddProductPage />);

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
    });
});