import { GET } from '@/app/api/dashboard/products/categories/route';
import { GetCategoriesAction } from '@/app/api/server_actions/dashboard/products/categories/CategoriesActions';

jest.mock('@/app/api/server_actions/dashboard/products/categories/CategoriesActions', () => ({
    GetCategoriesAction: jest.fn(),
}));

describe('GET /api/dashboard/products/categories', () => {
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

    it('should return 200 and category data when categories are found', async () => {
        const req = mockRequest('http://localhost/api/dashboard/products/categories');
        const res = mockResponse();

        GetCategoriesAction.mockResolvedValueOnce([{ categories_id: '1', categories_name: 'Fruits' }]);

        await GET(req, res);

        expect(GetCategoriesAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ categories_id: '1', categories_name: 'Fruits' }]);
    });

    it('should return 404 and error message when no categories are found', async () => {
        const req = mockRequest('http://localhost/api/dashboard/products/categories');
        const res = mockResponse();

        GetCategoriesAction.mockResolvedValueOnce(null);

        await GET(req, res);

        expect(GetCategoriesAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No data found' });
    });

    it('should return 500 and error message when there is a server error', async () => {
        const req = mockRequest('http://localhost/api/dashboard/products/categories');
        const res = mockResponse();

        GetCategoriesAction.mockRejectedValueOnce(new Error('Server error'));

        await GET(req, res);

        expect(GetCategoriesAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
});
