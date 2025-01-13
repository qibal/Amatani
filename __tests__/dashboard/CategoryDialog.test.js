import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManageCategoriesDialog from '@/components/dashboard/product/CategoryDialog';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn((url) => {
    if (url.endsWith('/api/dashboard/products/categories')) {
        return Promise.resolve({
            json: () => Promise.resolve([
                { categories_id: '12a3fdda-f24c-453c-bca8-9cef23f68e7f', categories_name: 'Buah - Buahan' },
                { categories_id: '67c3561e-c2be-454d-9ea7-1b7118c1b8cd', categories_name: 'Tes 1' },
                { categories_id: 'e7c78acb-e204-4752-aad9-497b2b284c91', categories_name: 'Unggas' },
                { categories_id: 'f444a3fa-f4bc-4aa6-bddf-8b27d6b08992', categories_name: 'Sayur - Sayuran' },
                { categories_id: 'f937514a-1e12-4254-b32a-1b351762bf2d', categories_name: 'Daging' },
            ]),
        });
    }
    if (url.endsWith('/api/dashboard/products/categories/insert')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        });
    }
    if (url.includes('/api/dashboard/products/categories/delete/')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
});

describe('ManageCategoriesDialog', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should render the dialog and add category', async () => {
        render(<ManageCategoriesDialog />);

        fireEvent.click(screen.getByText(/Manage Categories/i));

        await waitFor(() => {
            expect(screen.getByText(/Manage Your Categories/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter category name/i), { target: { value: 'New Category' } });
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));

        await waitFor(() => {
            expect(screen.getByText(/Category added successfully!/i)).toBeInTheDocument();
        });
    });

    it('should delete a category', async () => {
        render(<ManageCategoriesDialog />);

        fireEvent.click(screen.getByText(/Manage Categories/i));

        await waitFor(() => {
            expect(screen.getByText(/Manage Your Categories/i)).toBeInTheDocument();
        });

        // Find the delete button for the specific category
        const deleteButton = screen.getAllByRole('button', { name: /Delete/i })[0];
        fireEvent.click(deleteButton);

        // Confirm the deletion in the alert dialog
        const confirmDeleteButton = screen.getByRole('button', { name: /Delete/i });
        fireEvent.click(confirmDeleteButton);

        await waitFor(() => {
            expect(screen.getByText(/Category deleted successfully./i)).toBeInTheDocument();
        });
    });
});