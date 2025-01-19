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
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    it('should render the dialog and add category', async () => {
        const { asFragment } = render(<ManageCategoriesDialog />);

        fireEvent.click(screen.getByText(/Manage Categories/i));

        await waitFor(() => {
            expect(screen.getByText(/Manage Your Categories/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter category name/i), { target: { value: 'New Category' } });
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));

        await waitFor(() => {
            expect(screen.getByText(/Category added successfully!/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should delete a category', async () => {
        const { asFragment } = render(<ManageCategoriesDialog />);

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

        expect(asFragment()).toMatchSnapshot();
    });

    it('should display validation error when adding an empty category', async () => {
        const { asFragment } = render(<ManageCategoriesDialog />);

        fireEvent.click(screen.getByText(/Manage Categories/i));

        await waitFor(() => {
            expect(screen.getByText(/Manage Your Categories/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /Add/i }));

        await waitFor(() => {
            expect(screen.getByText(/Jangan lupa di isi/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle API errors gracefully when adding a category', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to add category' }),
        }));

        const { asFragment } = render(<ManageCategoriesDialog />);

        fireEvent.click(screen.getByText(/Manage Categories/i));

        await waitFor(() => {
            expect(screen.getByText(/Manage Your Categories/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter category name/i), { target: { value: 'New Category' } });
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to add category/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle API errors gracefully when deleting a category', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to delete category' }),
        }));

        const { asFragment } = render(<ManageCategoriesDialog />);

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
            expect(screen.getByText(/Failed to delete category/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle edge cases gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                { categories_id: 'edge-case-id', categories_name: 'Edge Case Category' },
            ]),
        }));

        const { asFragment } = render(<ManageCategoriesDialog />);

        fireEvent.click(screen.getByText(/Manage Categories/i));

        await waitFor(() => {
            expect(screen.getByText(/Manage Your Categories/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Edge Case Category/i)).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle invalid input gracefully', async () => {
        const { asFragment } = render(<ManageCategoriesDialog />);

        fireEvent.click(screen.getByText(/Manage Categories/i));

        await waitFor(() => {
            expect(screen.getByText(/Manage Your Categories/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter category name/i), { target: { value: '' } });
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));

        await waitFor(() => {
            expect(screen.getByText(/Jangan lupa di isi/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });
});
