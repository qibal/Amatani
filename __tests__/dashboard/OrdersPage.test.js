import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrdersPage from '@/app/(dashboard)/admin/orders/page';
import '@testing-library/jest-dom';
import { supabase } from '@/lib/supabase/client';
import { SidebarProvider } from '@/components/shadcnUi/sidebar';

jest.mock('@/lib/supabase/client', () => ({
    supabase: {
        storage: {
            from: jest.fn(() => ({
                remove: jest.fn(() => Promise.resolve({ error: null })),
            })),
        },
    },
}));

global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
}));

const ordersData = [
    {
        order_id: 1,
        user_id: "123",
        order_status: "pending",
        total_amount: 150000,
        order_date: "2024-11-18T15:30:45Z",
        payment: {
            payment_status: "pending",
            payment_method: "Credit Card",
        },
        details: [
            { product_id: 1, quantity: 2, price_at_purchase: 50000 },
            { product_id: 2, quantity: 1, price_at_purchase: 50000 },
        ],
    },
];

const usersData = [
    { id: "123", email: "john.doe@example.com" },
    { id: "456", email: "jane.smith@example.com" },
];

window.matchMedia = jest.fn().mockImplementation(query => {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    };
});

describe('OrdersPage', () => {
    beforeEach(() => {
        fetch.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    it('should render the OrdersPage and display orders', async () => {
        const { asFragment } = render(
            <SidebarProvider>
                <OrdersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Semua Orders/i)).toBeInTheDocument();
            expect(screen.getByText(/Order ID/i)).toBeInTheDocument();
            expect(screen.getByText(/User Email/i)).toBeInTheDocument();
            expect(screen.getByText(/Order Status/i)).toBeInTheDocument();
            expect(screen.getByText(/Total Amount/i)).toBeInTheDocument();
            expect(screen.getByText(/Order Date & Time/i)).toBeInTheDocument();
            expect(screen.getByText(/Payment Status/i)).toBeInTheDocument();
            expect(screen.getByText(/Actions/i)).toBeInTheDocument();
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle order deletion', async () => {
        render(
            <SidebarProvider>
                <OrdersPage />
            </SidebarProvider>
        );

        fireEvent.click(screen.getByText(/Delete Order/i));

        await waitFor(() => {
            expect(screen.queryByText(/Order ID: 1/i)).not.toBeInTheDocument();
        });
    });

    it('should display order details', async () => {
        render(
            <SidebarProvider>
                <OrdersPage />
            </SidebarProvider>
        );

        fireEvent.click(screen.getByText(/View Details/i));

        await waitFor(() => {
            expect(screen.getByText(/Order ID: 1/i)).toBeInTheDocument();
            expect(screen.getByText(/User Email: john.doe@example.com/i)).toBeInTheDocument();
            expect(screen.getByText(/Order Status: pending/i)).toBeInTheDocument();
            expect(screen.getByText(/Total Amount: Rp 150,000/i)).toBeInTheDocument();
            expect(screen.getByText(/Order Date & Time: 18 November 2024 15:30/i)).toBeInTheDocument();
            expect(screen.getByText(/Payment Status: pending/i)).toBeInTheDocument();
        });
    });

    it('should handle API errors gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ message: 'Failed to fetch orders' }),
        }));

        render(
            <SidebarProvider>
                <OrdersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch orders/i)).toBeInTheDocument();
        });
    });

    it('should handle invalid input gracefully', async () => {
        render(
            <SidebarProvider>
                <OrdersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Order ID/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'Invalid Input' } });

        await waitFor(() => {
            expect(screen.queryByText(/Order ID: 1/i)).not.toBeInTheDocument();
        });
    });

    it('should handle edge cases gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                {
                    order_id: 2,
                    user_id: "456",
                    order_status: "completed",
                    total_amount: 0,
                    order_date: "2024-11-19T15:30:45Z",
                    payment: {
                        payment_status: "completed",
                        payment_method: "PayPal",
                    },
                    details: [],
                },
            ]),
        }));

        render(
            <SidebarProvider>
                <OrdersPage />
            </SidebarProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Order ID: 2/i)).toBeInTheDocument();
            expect(screen.getByText(/User Email: jane.smith@example.com/i)).toBeInTheDocument();
            expect(screen.getByText(/Order Status: completed/i)).toBeInTheDocument();
            expect(screen.getByText(/Total Amount: Rp 0/i)).toBeInTheDocument();
            expect(screen.getByText(/Order Date & Time: 19 November 2024 15:30/i)).toBeInTheDocument();
            expect(screen.getByText(/Payment Status: completed/i)).toBeInTheDocument();
        });
    });
});
