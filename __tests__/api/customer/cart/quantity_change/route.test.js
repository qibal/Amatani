import { POST } from '@/app/api/customer/cart/quantity_change/route';
import { QuantityChangeCartCustomer } from '@/app/api/server_actions/customer/cart/CartActions';

jest.mock('@/app/api/server_actions/customer/cart/CartActions', () => ({
    QuantityChangeCartCustomer: jest.fn(),
}));

describe('POST /api/customer/cart/quantity_change', () => {
    const mockRequest = (body) => ({
        json: jest.fn().mockResolvedValue(body),
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 and success message when quantity is updated successfully', async () => {
        const req = mockRequest({ cart_items_id: '1', quantity: 2, user_id: 'test-user-id' });
        const res = mockResponse();

        QuantityChangeCartCustomer.mockResolvedValueOnce({ success: true, message: 'Quantity updated successfully' });

        await POST(req, res);

        expect(QuantityChangeCartCustomer).toHaveBeenCalledWith({ cart_items_id: '1', quantity: 2, user_id: 'test-user-id' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Quantity updated successfully' });
    });

    it('should return 404 and error message when item is not found', async () => {
        const req = mockRequest({ cart_items_id: '1', quantity: 2, user_id: 'test-user-id' });
        const res = mockResponse();

        QuantityChangeCartCustomer.mockResolvedValueOnce({ success: false, message: 'Item not found' });

        await POST(req, res);

        expect(QuantityChangeCartCustomer).toHaveBeenCalledWith({ cart_items_id: '1', quantity: 2, user_id: 'test-user-id' });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Item not found' });
    });

    it('should return 500 and error message when there is a server error', async () => {
        const req = mockRequest({ cart_items_id: '1', quantity: 2, user_id: 'test-user-id' });
        const res = mockResponse();

        QuantityChangeCartCustomer.mockRejectedValueOnce(new Error('Server error'));

        await POST(req, res);

        expect(QuantityChangeCartCustomer).toHaveBeenCalledWith({ cart_items_id: '1', quantity: 2, user_id: 'test-user-id' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
});
