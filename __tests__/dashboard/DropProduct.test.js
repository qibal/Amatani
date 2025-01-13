import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductImageUpload } from '@/components/dashboard/product/DropProductImage';
import '@testing-library/jest-dom';

describe('ProductImageUpload', () => {
    it('should render the component and handle file upload', async () => {
        const handleChange = jest.fn();
        render(<ProductImageUpload onChange={handleChange} value={[]} error={null} mode="add" />);

        fireEvent.click(screen.getByText(/Drag and drop product images here/i));

        const fileInput = screen.getByLabelText(/Product Images/i);
        const file = new File(['image'], 'image.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalled();
        });
    });

    it('should display error for invalid file type', async () => {
        render(<ProductImageUpload onChange={jest.fn()} value={[]} error={null} mode="add" />);

        fireEvent.click(screen.getByText(/Drag and drop product images here/i));

        const fileInput = screen.getByLabelText(/Product Images/i);
        const file = new File(['image'], 'image.txt', { type: 'text/plain' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByText(/Hanya menerima format gambar JPG, PNG, JPEG, or WebP./i)).toBeInTheDocument();
        });
    });
});