import { GET } from '@/app/api/customer/products/route';
import { GetProductActionCustomers } from '@/app/api/server_actions/customer/products/ProductActions';

jest.mock('@/app/api/server_actions/customer/products/ProductActions', () => ({
    GetProductActionCustomers: jest.fn(),
}));

describe('GET /api/customer/products', () => {
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
        const req = mockRequest('http://localhost/api/customer/products?products=apple');
        const res = mockResponse();

        GetProductActionCustomers.mockResolvedValueOnce([{ product_id: '1', products_name: 'Apple' }]);

        await GET(req, res);

        expect(GetProductActionCustomers).toHaveBeenCalledWith({ query: 'apple', type: 'products' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ product_id: '1', products_name: 'Apple' }]);
    });

    it('should return 404 and error message when no products are found', async () => {
        const req = mockRequest('http://localhost/api/customer/products?products=unknown');
        const res = mockResponse();

        GetProductActionCustomers.mockResolvedValueOnce(null);

        await GET(req, res);

        expect(GetProductActionCustomers).toHaveBeenCalledWith({ query: 'unknown', type: 'products' });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No data found' });
    });

    it('should return 500 and error message when there is a server error', async () => {
        const req = mockRequest('http://localhost/api/customer/products?products=error');
        const res = mockResponse();

        GetProductActionCustomers.mockRejectedValueOnce(new Error('Server error'));

        await GET(req, res);

        expect(GetProductActionCustomers).toHaveBeenCalledWith({ query: 'error', type: 'products' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
});
