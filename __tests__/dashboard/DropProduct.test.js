import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductImageUpload } from '@/components/dashboard/product/DropProductImage';
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

    it('should handle file removal', async () => {
        const handleChange = jest.fn();
        const file = new File(['image'], 'image.png', { type: 'image/png' });
        const fileWithPreview = Object.assign(file, { preview: 'data:image/png;base64,example' });

        render(<ProductImageUpload onChange={handleChange} value={[fileWithPreview]} error={null} mode="add" />);

        fireEvent.click(screen.getByText(/×/i));

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledWith([]);
        });
    });

    it('should handle file removal from storage', async () => {
        const handleChange = jest.fn();
        const fileUrl = 'https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/product_images/image.png';

        render(<ProductImageUpload onChange={handleChange} value={[fileUrl]} error={null} mode="edit" />);

        fireEvent.click(screen.getByText(/×/i));

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledWith([]);
            expect(supabase.storage.from().remove).toHaveBeenCalledWith(['image.png']);
        });
    });
});
