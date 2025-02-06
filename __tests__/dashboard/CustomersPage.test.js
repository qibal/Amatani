import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomersPage from '@/app/(dashboard)/admin/customers/page';
import '@testing-library/jest-dom';
import supabaseAuthAdmin from '@/lib/supabase/client_admin';
import { SidebarProvider } from '@/components/shadcnUi/sidebar';

jest.mock('@/lib/supabase/client_admin', () => ({
    __esModule: true,
    default: {
        auth: {
            admin: {
                listUsers: jest.fn(),
                deleteUser: jest.fn(),
            },
        },
    },
}));

jest.mock('@/components/ui/sidebar', () => ({
    ...jest.requireActual('@/components/ui/sidebar'),
    useSidebar: jest.fn(() => ({
        state: 'expanded',
        open: true,
        setOpen: jest.fn(),
        isMobile: false,
        openMobile: false,
        setOpenMobile: jest.fn(),
        toggleSidebar: jest.fn(),
    })),
}));

describe('CustomersPage', () => {
    const mockUsers = [
        {
            id: '1',
            user_metadata: { name: 'John Doe', avatar_url: '' },
            email: 'john.doe@example.com',
            phone: '1234567890',
            created_at: '2023-01-01T00:00:00Z',
            last_sign_in_at: '2023-01-02T00:00:00Z',
        },
        {
            id: '2',
            user_metadata: { name: 'Jane Smith', avatar_url: '' },
            email: 'jane.smith@example.com',
            phone: '0987654321',
            created_at: '2023-01-03T00:00:00Z',
            last_sign_in_at: '2023-01-04T00:00:00Z',
        },
    ];

    beforeEach(() => {
        supabaseAuthAdmin.auth.admin.listUsers.mockResolvedValue({ data: { users: mockUsers }, error: null });
        supabaseAuthAdmin.auth.admin.deleteUser.mockResolvedValue({ data: null, error: null });
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    it('should render the CustomersPage and display users', async () => {
        const { asFragment } = render(
            <SidebarProvider>
                <CustomersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should delete a user', async () => {
        render(
            <SidebarProvider>
                <CustomersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('Delete')[0]);

        await waitFor(() => {
            expect(supabaseAuthAdmin.auth.admin.deleteUser).toHaveBeenCalledWith('1');
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        });
    });

    it('should handle API errors gracefully', async () => {
        supabaseAuthAdmin.auth.admin.listUsers.mockResolvedValueOnce({ data: null, error: new Error('Failed to fetch users') });

        render(
            <SidebarProvider>
                <CustomersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
        });
    });

    it('should handle invalid input gracefully', async () => {
        render(
            <SidebarProvider>
                <CustomersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'Invalid Input' } });

        await waitFor(() => {
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
            expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
        });
    });

    it('should handle edge cases gracefully', async () => {
        supabaseAuthAdmin.auth.admin.listUsers.mockResolvedValueOnce({ data: { users: [] }, error: null });

        render(
            <SidebarProvider>
                <CustomersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('No users found')).toBeInTheDocument();
        });
    });

    it('should handle error cases gracefully', async () => {
        supabaseAuthAdmin.auth.admin.listUsers.mockResolvedValueOnce({ data: null, error: new Error('Error fetching users') });

        render(
            <SidebarProvider>
                <CustomersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Error fetching users')).toBeInTheDocument();
        });
    });
});
