import { GET } from '@/app/api/dashboard/products/route';
import { GetProductAction } from '@/app/api/server_actions/dashboard/products/ProductsActions';

jest.mock('@/app/api/server_actions/dashboard/products/ProductsActions', () => ({
    GetProductAction: jest.fn(),
}));

describe('GET /api/dashboard/products', () => {
    const mockRequest = (url) => ({
        url,
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

    it('should return 200 and product data when products are found', async () => {
        const req = mockRequest('http://localhost/api/dashboard/products?search=apple');
        const res = mockResponse();

        GetProductAction.mockResolvedValueOnce([{ product_id: '1', products_name: 'Apple' }]);

        await GET(req, res);

        expect(GetProductAction).toHaveBeenCalledWith({ searchQuery: 'apple', sort: undefined, limit: 10, offset: 0 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ product_id: '1', products_name: 'Apple' }]);
    });

    it('should return 404 and error message when no products are found', async () => {
        const req = mockRequest('http://localhost/api/dashboard/products?search=unknown');
        const res = mockResponse();

        GetProductAction.mockResolvedValueOnce(null);

        await GET(req, res);

        expect(GetProductAction).toHaveBeenCalledWith({ searchQuery: 'unknown', sort: undefined, limit: 10, offset: 0 });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No data found' });
    });

    it('should return 500 and error message when there is a server error', async () => {
        const req = mockRequest('http://localhost/api/dashboard/products?search=error');
        const res = mockResponse();

        GetProductAction.mockRejectedValueOnce(new Error('Server error'));

        await GET(req, res);

        expect(GetProductAction).toHaveBeenCalledWith({ searchQuery: 'error', sort: undefined, limit: 10, offset: 0 });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
});
