import { DELETE } from '@/app/api/dashboard/products/delete/[product_id]/route';
import { DeleteProductAction } from '@/app/api/server_actions/dashboard/products/ProductsActions';

jest.mock('@/app/api/server_actions/dashboard/products/ProductsActions', () => ({
    DeleteProductAction: jest.fn(),
}));

describe('DELETE /api/dashboard/products/delete/[product_id]', () => {
    const mockRequest = (params) => ({
        params,
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

    it('should return 200 and product data when product is deleted successfully', async () => {
        const req = mockRequest({ product_id: '1' });
        const res = mockResponse();

        DeleteProductAction.mockResolvedValueOnce({ product_id: '1', products_name: 'Test Product' });

        await DELETE(req, res);

        expect(DeleteProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ product_id: '1', products_name: 'Test Product' });
    });

    it('should return 404 and error message when no data is found', async () => {
        const req = mockRequest({ product_id: '1' });
        const res = mockResponse();

        DeleteProductAction.mockResolvedValueOnce(null);

        await DELETE(req, res);

        expect(DeleteProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No data found' });
    });

    it('should return 500 and error message when there is a server error', async () => {
        const req = mockRequest({ product_id: '1' });
        const res = mockResponse();

        DeleteProductAction.mockRejectedValueOnce(new Error('Server error'));

        await DELETE(req, res);

        expect(DeleteProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
});
