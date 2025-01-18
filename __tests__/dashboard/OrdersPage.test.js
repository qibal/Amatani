import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrdersPage from '@/app/dashboard/orders/page';
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

describe('OrdersPage', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should render the OrdersPage and display orders', async () => {
        render(<OrdersPage />);

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
    });

    it('should handle order deletion', async () => {
        render(<OrdersPage />);

        fireEvent.click(screen.getByText(/Delete Order/i));

        await waitFor(() => {
            expect(screen.queryByText(/Order ID: 1/i)).not.toBeInTheDocument();
        });
    });

    it('should display order details', async () => {
        render(<OrdersPage />);

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
});
