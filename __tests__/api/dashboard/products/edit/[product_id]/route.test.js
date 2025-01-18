import { PUT } from '@/app/api/dashboard/products/edit/[product_id]/route';
import { UpdateProductAction } from '@/app/api/server_actions/dashboard/products/ProductsActions';

jest.mock('@/app/api/server_actions/dashboard/products/ProductsActions', () => ({
    UpdateProductAction: jest.fn(),
}));

describe('PUT /api/dashboard/products/edit/[product_id]', () => {
    const mockRequest = (params, body) => ({
        params,
        body,
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

    it('should return 200 and updated product data when product is updated successfully', async () => {
        const req = mockRequest({ product_id: '1' }, { products_name: 'Updated Product' });
        const res = mockResponse();

        UpdateProductAction.mockResolvedValueOnce({ product_id: '1', products_name: 'Updated Product' });

        await PUT(req, res);

        expect(UpdateProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ product_id: '1', products_name: 'Updated Product' });
    });

    it('should return 404 and error message when no data is found', async () => {
        const req = mockRequest({ product_id: '1' }, { products_name: 'Updated Product' });
        const res = mockResponse();

        UpdateProductAction.mockResolvedValueOnce(null);

        await PUT(req, res);

        expect(UpdateProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No data found' });
    });

    it('should return 500 and error message when there is a server error', async () => {
        const req = mockRequest({ product_id: '1' }, { products_name: 'Updated Product' });
        const res = mockResponse();

        UpdateProductAction.mockRejectedValueOnce(new Error('Server error'));

        await PUT(req, res);

        expect(UpdateProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
});
