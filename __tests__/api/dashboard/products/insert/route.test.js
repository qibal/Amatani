import { POST } from '@/app/api/dashboard/products/insert/route';
import { InsertProductAction } from '@/app/api/server_actions/dashboard/products/ProductsActions';

jest.mock('@/app/api/server_actions/dashboard/products/ProductsActions', () => ({
    InsertProductAction: jest.fn(),
}));

describe('POST /api/dashboard/products/insert', () => {
    const mockRequest = (body) => ({
        formData: jest.fn().mockResolvedValue(body),
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

    it('should return 200 and product data when product is inserted successfully', async () => {
        const req = mockRequest({
            products_name: 'Test Product',
            products_description: 'Test Description',
            stock: '10',
            fixed_price: '100',
            price_type: 'fixed',
            category: JSON.stringify({ categories_id: '1', categories_name: 'Fruits' }),
            product_images: [new File(['image'], 'image.png', { type: 'image/png' })],
            wholesalePrices: JSON.stringify([]),
        });
        const res = mockResponse();

        InsertProductAction.mockResolvedValueOnce({ product_id: '1', products_name: 'Test Product' });

        await POST(req, res);

        expect(InsertProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ product_id: '1', products_name: 'Test Product' });
    });

    it('should return 404 and error message when no data is found', async () => {
        const req = mockRequest({
            products_name: 'Test Product',
            products_description: 'Test Description',
            stock: '10',
            fixed_price: '100',
            price_type: 'fixed',
            category: JSON.stringify({ categories_id: '1', categories_name: 'Fruits' }),
            product_images: [new File(['image'], 'image.png', { type: 'image/png' })],
            wholesalePrices: JSON.stringify([]),
        });
        const res = mockResponse();

        InsertProductAction.mockResolvedValueOnce(null);

        await POST(req, res);

        expect(InsertProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No data found' });
    });

    it('should return 500 and error message when there is a server error', async () => {
        const req = mockRequest({
            products_name: 'Test Product',
            products_description: 'Test Description',
            stock: '10',
            fixed_price: '100',
            price_type: 'fixed',
            category: JSON.stringify({ categories_id: '1', categories_name: 'Fruits' }),
            product_images: [new File(['image'], 'image.png', { type: 'image/png' })],
            wholesalePrices: JSON.stringify([]),
        });
        const res = mockResponse();

        InsertProductAction.mockRejectedValueOnce(new Error('Server error'));

        await POST(req, res);

        expect(InsertProductAction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
});
