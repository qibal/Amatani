import { POST } from '@/app/api/customer/products/products_detail/add_to_cart/route';
import { AddToCartCustomers } from '@/app/api/server_actions/customer/products/detail_products/D_productActions';

jest.mock('@/app/api/server_actions/customer/products/detail_products/D_productActions', () => ({
    AddToCartCustomers: jest.fn(),
}));

describe('POST /api/customer/products/add_to_cart', () => {
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

    it('should return 200 and success message when item is added to cart successfully', async () => {
        const req = mockRequest({ product_id: '1', quantity: 2, user_id: 'test-user-id' });
        const res = mockResponse();

        AddToCartCustomers.mockResolvedValueOnce({ success: true, message: 'Item added to cart successfully' });

        await POST(req, res);

        expect(AddToCartCustomers).toHaveBeenCalledWith({ product_id: '1', quantity: 2, user_id: 'test-user-id' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Item added to cart successfully' });
    });

    it('should return 404 and error message when item is not found', async () => {
        const req = mockRequest({ product_id: '1', quantity: 2, user_id: 'test-user-id' });
        const res = mockResponse();

        AddToCartCustomers.mockResolvedValueOnce({ success: false, message: 'Item not found' });

        await POST(req, res);

        expect(AddToCartCustomers).toHaveBeenCalledWith({ product_id: '1', quantity: 2, user_id: 'test-user-id' });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Item not found' });
    });

    it('should return 500 and error message when there is a server error', async () => {
        const req = mockRequest({ product_id: '1', quantity: 2, user_id: 'test-user-id' });
        const res = mockResponse();

        AddToCartCustomers.mockRejectedValueOnce(new Error('Server error'));

        await POST(req, res);

        expect(AddToCartCustomers).toHaveBeenCalledWith({ product_id: '1', quantity: 2, user_id: 'test-user-id' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
});
