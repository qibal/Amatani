import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FaqPage from '@/app/dashboard/faq/page';
import '@testing-library/jest-dom';
import { SidebarProvider } from '@/context/SidebarContext'; // P938f

// Mock fetch
global.fetch = jest.fn((url, options) => {
    if (url.endsWith('/api/dashboard/faq')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                { faq_id: '1', title: 'FAQ 1', content: 'Content 1', category_id: '1', category_name: 'Category 1' },
                { faq_id: '2', title: 'FAQ 2', content: 'Content 2', category_id: '2', category_name: 'Category 2' },
            ]),
        });
    }
    if (url.endsWith('/api/dashboard/faq/delete/1')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'FAQ deleted successfully' }),
        });
    }
    return Promise.reject(new Error('Unknown endpoint'));
});

describe('FaqPage', () => {
    beforeEach(() => {
        fetch.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    it('should render the FaqPage and display FAQs', async () => {
        const { asFragment } = render(
            <SidebarProvider>
                <FaqPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/FAQ 1/i)).toBeInTheDocument();
            expect(screen.getByText(/FAQ 2/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should delete an FAQ', async () => {
        render(
            <SidebarProvider>
                <FaqPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/FAQ 1/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByRole('button', { name: /Delete/i })[0]);

        await waitFor(() => {
            expect(screen.queryByText(/FAQ 1/i)).not.toBeInTheDocument();
        });
    });

    it('should handle API errors gracefully when deleting an FAQ', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to delete FAQ' }),
        }));

        render(
            <SidebarProvider>
                <FaqPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/FAQ 1/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByRole('button', { name: /Delete/i })[0]);

        await waitFor(() => {
            expect(screen.getByText(/Failed to delete FAQ/i)).toBeInTheDocument();
        });
    });

    it('should handle API errors gracefully when fetching FAQs', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to fetch FAQs' }),
        }));

        render(
            <SidebarProvider>
                <FaqPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch FAQs/i)).toBeInTheDocument();
        });
    });

    it('should handle invalid input gracefully', async () => {
        render(
            <SidebarProvider>
                <FaqPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/FAQ 1/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText(/Search FAQs/i), { target: { value: 'Invalid Input' } });

        await waitFor(() => {
            expect(screen.queryByText(/FAQ 1/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/FAQ 2/i)).not.toBeInTheDocument();
        });
    });

    it('should handle edge cases gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                { faq_id: '3', title: 'Edge Case FAQ', content: 'Edge Case Content', category_id: '3', category_name: 'Edge Case Category' },
            ]),
        }));

        render(
            <SidebarProvider>
                <FaqPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Edge Case FAQ/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Edge Case Content/i)).toBeInTheDocument();
    });
});